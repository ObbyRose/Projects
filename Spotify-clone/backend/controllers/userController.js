import User from "../models/userModel.js"; // Ensure this path is correct and the User model is properly defined

if (!User || typeof User.findOne !== 'function') {
    throw new Error("User model is not defined or findOne is not a function");
}


import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

const getUserProfile = async (req, res) => {
    const { query } = req.query;
    
    try {
        let user;
        
        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
        } else {
            user = await User.findOne({ displayName: query }).select("-password").select("-updatedAt");
        }
        
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in getUserProfile: ", err.message);
    }
};

const signupUser = async (req, res) => {
    try {
        const { UserId, displayName, email, password, accessToken, refreshToken, expiresIn, profilePicture } = req.body;
        
        // Log incoming data
        console.log('Signup request body:', req.body);

        if (!accessToken || !refreshToken || !expiresIn) {
            return res.status(400).json({ error: "Spotify tokens are required for signup" });
        }

        const existingUser = await User.findOne({ UserId });
        console.log('Existing user:', existingUser);

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const newUser = new User({
            UserId,
            email,
            password: hashedPassword,
            displayName,
            accessToken,
            refreshToken,
            expiresIn,
            profilePicture,
        });

        const savedUser = await newUser.save();
        console.log('New user saved:', savedUser);

        // Generate token and set cookie
        generateTokenAndSetCookie(savedUser._id, res);

        res.status(201).json({
            _id: savedUser._id,
            displayName: savedUser.displayName,
            email: savedUser.email,
            profilePicture: savedUser.profilePicture,
        });
    } catch (err) {
        console.error('Error during signup:', err.message);

        if (err.code === 11000) { // Handle unique constraint errors
            return res.status(400).json({ error: "User already exists" });
        }

        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid email or password" });

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            displayName: user.displayName,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in loginUser: ", error.message);
    }
};

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in logoutUser: ", err.message);
    }
};

const followUnFollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString())
            return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

        if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            // Unfollow user
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            // Follow user
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            res.status(200).json({ message: "User followed successfully" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in followUnFollowUser: ", err.message);
    }
};

const updateUser = async (req, res) => {
    const { displayName, email, password } = req.body;
    let { profilePicture } = req.body;

    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({ error: "User not found" });

        if (req.params.id !== userId.toString())
            return res.status(400).json({ error: "You cannot update other user's profile" });

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        if (profilePicture) {
            if (user.profilePicture) {
                await cloudinary.uploader.destroy(user.profilePicture.split("/").pop().split(".")[0]);
            }

            const uploadedResponse = await cloudinary.uploader.upload(profilePicture);
            profilePicture = uploadedResponse.secure_url;
        }

        user.displayName = displayName || user.displayName;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;

        user = await user.save();

        await Post.updateMany(
            { "replies.userId": userId },
            {
                $set: {
                    "replies.$[reply].email": user.email,
                    "replies.$[reply].userProfilePic": user.profilePicture,
                },
            },
            { arrayFilters: [{ "reply.userId": userId }] }
        );

        user.password = null;

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in updateUser: ", err.message);
    }
};

export {
    signupUser,
    loginUser,
    logoutUser,
    followUnFollowUser,
    updateUser,
    getUserProfile,
};
