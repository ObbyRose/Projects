import express from 'express';
import { fetchTrackDetails, fetchArtistDetails, fetchTracks } from '../controllers/apiCallsController.js';

const router = express.Router();

router.get('/artist/:artistId', fetchArtistDetails);
router.get('/tracks/:trackId', fetchTrackDetails);
router.get('/tracks', fetchTracks);

export default router;
