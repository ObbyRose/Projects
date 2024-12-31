import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import routes from './routes/index.js';
import path from 'path';
import cloudinary from 'cloudinary';
import User from './models/User.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const frontendPath = path.join(__dirname, "../../frontend/dist");
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(frontendPath));

app.use('/api', routes);

app.get('/spotify/login', (req, res) => {
    const scopes = 'user-library-read playlist-modify-public playlist-modify-private';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
    
    res.redirect(authUrl);
});

app.get('/spotify/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send('No authorization code provided');
    }

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'authorization_code',
                code, 
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        const token = req.cookies.token || req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.userId;

        // Save Spotify tokens to your database, linked to your user
        await User.findByIdAndUpdate(userId, {
            accessToken: access_token,
            refreshToken: refresh_token,
            tokenExpiresIn: Date.now() + expires_in * 1000, 
        });

        console.log('Access Token:', access_token);
        console.log('Refresh Token:', refresh_token);
        console.log('Expires In:', expires_in);

        const userProfile = await axios.get('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        
        console.log('User Profile:', userProfile.data);

        res.send('Successfully authenticated with Spotify!');
    } catch (error) {
        console.error('Error during token exchange or API call:', error);
        res.status(500).send('Failed to authenticate with Spotify');
    }
});

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const { access_token, expires_in } = response.data;
        console.log('New Access Token:', access_token);
        return access_token;
    } catch (error) {
        console.error('Error refreshing token', error);
        throw new Error('Unable to refresh token');
    }
};

app.get('/spotify/profile', async (req, res) => {
    try {
        const token = req.cookies.token || req.headers['authorization'].split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId);
        const storedRefreshToken = user.refreshToken;
        let accessToken = user.accessToken;

        if (isAccessTokenExpired(accessToken)) {
            accessToken = await refreshAccessToken(storedRefreshToken);
        }

        const userProfile = await axios.get('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        res.json(userProfile.data);
    } catch (error) {
        console.error('Error fetching user profile from Spotify:', error);
        res.status(500).send('Failed to fetch profile');
    }
});

const isAccessTokenExpired = (accessToken) => {
    const decodedToken = decodeJwtToken(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
};

const decodeJwtToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload);
};

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
