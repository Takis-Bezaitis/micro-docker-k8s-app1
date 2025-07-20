import Artist from "../models/artistModel.js";

export const fetchArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something went wrong.'});
    }
}

export const createArtist = async (req, res) => {
    const { name } = req.body;
    try {
        const findArtist = await Artist.findOne({name})
        if (findArtist) {
            return res.status(400).json({message: 'Artist already exists.'});
        }

        const artist = new Artist({
            name
        });
        await artist.save();
        res.status(201).json(artist);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong.'});
    }
}


export const fetchArtist = async (req, res) => {
    const { artistId } = req.params;

    try {
        const artist = await Artist.findById({_id: artistId});
        if (!artist) {
            return res.status(400).json({message: 'Artist not found.'});
        }
        res.status(201).json(artist);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong.'});
    }
}