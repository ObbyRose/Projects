import bcrypt from "bcryptjs";
import User from "../schema/userSchema.js";
import { generateTokenAndSetCookie } from "../utils/jwtUtils.js";

// Guest login handler
const guestLogin = (_req, res) => {
	const guestUser = {
		id: "guest",
		name: "Guest User",
		email: "guest@example.com",
		plan: "Guest",
	};
	const token = generateTokenAndSetCookie(guestUser.id, res)
	res.status(200).json({ message: "Logged in as guest", token });
};

// Signup a new user
const signup = async (req, res) => {
	const { name, email, password, plan, role } = req.body;

	try {
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).send("User with this email already exists.");
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = new User({ name, email, password: hashedPassword, role, plan: plan || "Standard" });
		await newUser.save();

		const token = generateTokenAndSetCookie(newUser.id,res)

		res.status(201).json({ token, user: newUser });
	} catch (err) {
		res.status(500).send("Error registering user");
	}
};

// Login an existing user
const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).send("Invalid email or password.");
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send("Invalid email or password.");
		}

		const token = generateTokenAndSetCookie(user.id, res)

		res.status(200).json({ token, user });
	} catch (err) {
		res.status(500).send("Error logging in");
	}
};

// Logout a user (invalidate JWT token)
const logout = (req, res) => {
	console.log(req.user);
	
	if (!req.user.userId) {
		return res.status(401).send("Access denied");
	}
	res.clearCookie("jwt");
	// On the frontend, you'd typically remove the token from storage to log out.
	res.status(200).send("Logged out successfully.");
};

// Get user profile (authenticated)
const getProfile = async (req, res) => {
	console.log("baba");
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).send("User not found");
		};
		res.status(200).json(user);
	} catch (err) {
		res.status(500).send("Error fetching user profile");
	}
};

// Update user profile (authenticated)
const updateProfile = async (req, res) => {
	const { name, email, plan } = req.body;

	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).send("User not found");
		}

		if (email && email !== user.email) {
			const emailExists = await User.findOne({ email });
			if (emailExists) {
				return res.status(400).send("Email already in use");
			}
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.plan = plan || user.plan;

		await user.save();

		res.status(200).json(user);
	} catch (err) {
		res.status(500).send("Error updating profile");
	}
};

// Upgrade the user's plan (authenticated)
const upgradePlan = async (req, res) => {
	const { plan } = req.body;

	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			return res.status(404).send("User not found");
		}

		const validPlans = ["Standard", "Gold", "Platinum"];
		if (!validPlans.includes(plan)) {
			return res.status(400).send("Invalid plan selected");
		}

		user.plan = plan;

		await user.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).send("Error upgrading plan");
	}
};

const getAllUsers = async (_req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).send("Error fetching users");
	}
};

const deleteUser = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send("User not found");
		}

		await user.remove();
		res.status(200).send("User deleted successfully");
	} catch (err) {
		res.status(500).send("Error deleting user");
	}
};

export default {
	guestLogin,
	signup,
	login,
	logout,
	getProfile,
	updateProfile,
	upgradePlan,
	getAllUsers,
	deleteUser,
};
