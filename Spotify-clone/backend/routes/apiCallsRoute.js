import express from 'express';
import { fetchSongDetails, fetchArtistDetails, fetchPublicAlbums, fetchAllArtists } from '../controllers/apiCallsController.js';

const router = express.Router();

router.get('/artist/:artistId', fetchArtistDetails);
router.get('/artists', fetchAllArtists);
router.get('/artist/:artistId/albums', fetchPublicAlbums);
router.get('/song/:songId', fetchSongDetails);

export default router;
