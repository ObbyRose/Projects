import express from 'express';
import {
    createPlaylist,
    getPlaylistById,
    updatePlaylist,
    deletePlaylist,
    getPublicPlaylists,
} from '../controllers/customPlayilistController.js';

const router = express.Router();

router.post('/', createPlaylist);
router.get('/:id', getPlaylistById);
router.put('/:id', updatePlaylist);
router.delete('/:id', deletePlaylist);
router.get('/', getPublicPlaylists);

export default router;
