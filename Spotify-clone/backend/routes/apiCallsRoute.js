import express from 'express';
import { fetchTrackDetails, fetchArtistDetails } from '../controllers/apiCallsController.js';

const router = express.Router();

router.get('/artist/:artistId', fetchArtistDetails);
router.get('/track/:trackId', fetchTrackDetails);

export default router;
