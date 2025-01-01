import express from 'express';
import {
    createPlaylist,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    getPublicPlaylists,
} from '../controllers/customPlayilistController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute ,createPlaylist);
router.get('/:id', getPlaylistById);
router.put('/:id', protectRoute ,updatePlaylist);
router.delete('/:id', protectRoute ,deletePlaylist);
router.get('/', getPublicPlaylists);

export default router;
