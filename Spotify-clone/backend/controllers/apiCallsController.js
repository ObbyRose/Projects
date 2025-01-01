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
        res.json({ name, genres, artistImage, followers: followers.total, popularity });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in fetchArtistDetails:", err.message);
    }
};

const fetchPublicAlbums = async (req, res) => {
    try {
        const { artistId } = req.params;
        const accessToken = await getSpotifyAccessToken(req);

        const spotifyApiUrl = `${SPOTIFY_API_URL}/artists/${artistId}/albums`;
        const spotifyResponse = await axios.get(spotifyApiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const albums = spotifyResponse.data.items.map((album) => ({
            id: album.id,
            name: album.name,
            releaseDate: album.release_date,
            totalTracks: album.total_tracks,
            albumCover: album.images[0]?.url,
        }));

        res.json(albums);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in fetchPublicAlbums:", err.message);
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

const fetchSongDetails = async (req, res) => {
    try {
        const { songId } = req.params;
        const accessToken = await getSpotifyAccessToken(req); 

        const spotifyApiUrl = `${SPOTIFY_API_URL}/tracks/${songId}`;
        const spotifyResponse = await axios.get(spotifyApiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const songDetails = spotifyResponse.data;
        const { name: title, artists, album, duration_ms, id: spotifySongId } = songDetails;
        const artist = artists.map((a) => a.name).join(", ");
        const albumName = album.name;
        const albumCover = album.images[0].url;
        const duration = duration_ms / 1000;

        // Return song details as a response or data
        res.json({ spotifySongId, title, artist, albumName, albumCover, duration });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in fetchSongDetails:", err.message);
    }
};

const fetchAllArtists = async (req, res) => {
    try {
        const accessToken = await getSpotifyAccessToken(req);

        const spotifyApiUrl = `https://api.spotify.com/v1/artists`;
        const spotifyResponse = await axios.get(spotifyApiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const artists = spotifyResponse.data.artists.items.map((artist) => ({
            id: artist.id,
            name: artist.name,
            genres: artist.genres,
            artistImage: artist.images[0]?.url,
            followers: artist.followers.total,
            popularity: artist.popularity,
        }));

        res.json(artists);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in fetchAllArtists:", err.message);
    }
};

export { fetchSongDetails, fetchArtistDetails, fetchPublicAlbums, fetchAllArtists };