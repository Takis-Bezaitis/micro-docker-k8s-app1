import express from 'express';
import { fetchAlbums, fetchAlbum, fetchAlbumsByArtist, createAlbum} from "../controllers/albumsController.js";

const albumRouter = express.Router();

albumRouter.get('/', fetchAlbums);
albumRouter.get('/:id', fetchAlbum);
albumRouter.get('/:artistId/albums', fetchAlbumsByArtist);
albumRouter.post('/createAlbum', createAlbum);

export default albumRouter;

