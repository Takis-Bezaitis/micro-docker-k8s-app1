import express from 'express';
import { createArtist, fetchArtists } from '../controllers/artistsController.js';

const router = express.Router();

router.get('/', fetchArtists);
router.post('/createArtist', createArtist);

export default router;