import express from 'express';
import { createArtist, fetchArtists, fetchArtist } from '../controllers/artistsController.js';

const router = express.Router();

router.get('/', fetchArtists);
router.get('/:artistId', fetchArtist);
router.post('/createArtist', createArtist);

export default router;