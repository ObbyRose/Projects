const UserSchema = new mongoose.Schema({
    UserId: { type: String, unique: true, required: true }, // Spotify-provided user ID
    email: { type: String }, // Optional: for additional app features
    displayName: { type: String }, // User's name on Spotify
    accessToken: { type: String, required: true }, // Spotify API access token
    refreshToken: { type: String, required: true }, // Spotify API refresh token
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