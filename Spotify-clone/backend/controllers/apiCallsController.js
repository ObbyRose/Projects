import axios from "axios";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const fetchArtistDetails = async (req, res) => {
    try {
        const { artistId } = req.params;
        const accessToken = await getSpotifyAccessToken(req);

        const spotifyApiUrl = `${SPOTIFY_API_URL}/artists/${artistId}`;
        const spotifyResponse = await axios.get(spotifyApiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const artistDetails = spotifyResponse.data;
        const { name, genres, images, followers, popularity } = artistDetails;
        const artistImage = images[0]?.url;

        // Return artist details as a response or data
        return { name, genres, artistImage, followers: followers.total, popularity };
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in fetchArtistDetails:", err.message);
    }
};

const getSpotifyAccessToken = async (req) => {
    try {
        const user = await User.findById(req.user._id); 
        if (!user || !user.accessToken) {
            throw new Error("User not authenticated or access token not found.");
        }
        return user.accessToken;
    } catch (error) {
        console.error("Error fetching Spotify access token:", error);
        throw new Error("Failed to fetch Spotify access token.");
    }
};

const fetchTrackDetails = async (req, res) => {
    try {
        const { trackId } = req.params;
        const accessToken = await getSpotifyAccessToken(req); 

        const spotifyApiUrl = `${SPOTIFY_API_URL}/tracks/${trackId}`;
        const spotifyResponse = await axios.get(spotifyApiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const trackDetails = spotifyResponse.data;
        const { name: title, artists, album, duration_ms, id: spotifyTrackId } = trackDetails;
        const artist = artists.map((a) => a.name).join(", ");
        const albumName = album.name;
        const albumCover = album.images[0].url;
        const duration = duration_ms / 1000;

        // Return song details as a response or data
        return { spotifyTrackId, title, artist, albumName, albumCover, duration };
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in fetchTrackDetails:", err.message);
    }
};

export { fetchTrackDetails, fetchArtistDetails };
