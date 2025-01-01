import express from 'express';
import {
    createPlaylist,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    getPublicPlaylists,
    addSongToPlaylist,
} from '../controllers/customPlayilistController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute ,createPlaylist);
router.post('/:id/song/:songid', protectRoute ,addSongToPlaylist);
router.get('/:id', getPlaylistById);
router.put('/:id', protectRoute ,updatePlaylist);
router.delete('/:id', protectRoute ,deletePlaylist);
router.get('/', getPublicPlaylists);

export default router;
