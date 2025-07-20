import Album from "../models/album-Model.js";

export const fetchAlbums = async (req, res) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const fetchAlbum = async (req, res) => {
  const { id } = req.params;
  try {
    const album = await Album.findById(id);
    if (!album) {
      return res.status(400).json({ message: 'Album not found' });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const fetchAlbumsByArtist = async (req, res) => {
    const artistId = req.params.artistId;
    try {
        const artistAlbums = await Album.find({ artistId });
        res.status(200).json(artistAlbums);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const createAlbum = async (req, res) => {
    const { name, year, artistId } = req.body;
    try {
        const findAlbum = await Album.findOne({name});
        if (findAlbum) {
            return res.status(400).json({message: 'This album already exists.'});
        }

        const newAlbum = await Album.create({name, year, artistId});
        res.status(201).json(newAlbum);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}