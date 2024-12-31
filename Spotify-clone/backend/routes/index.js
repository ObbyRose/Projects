import express from 'express';
import userRoutes from './userRoutes.js';
import playlistRoutes from './playlistRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/playlists', playlistRoutes);

export default router;
