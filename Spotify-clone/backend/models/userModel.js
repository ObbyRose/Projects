import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String }, // Optional: for additional app features
    password: { type: String }, // Optional: for additional app features
    displayName: { type: String }, // User's name on Spotify
    accessToken: { type: String, required: true }, // Spotify API access token
    refreshToken: { type: String, required: false }, // Spotify API refresh token
    expiresIn: { type: Number, required: true }, // Token expiry time in seconds
    profilePicture: { type: String }, // URL of user's Spotify profile picture
    followers: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // References users who follow this user
    ],
    following: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // References users this user is following
    ],
    createdAt: { type: Date, default: Date.now }, // Track user creation
});  

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
