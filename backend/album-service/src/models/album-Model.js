import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    artistId: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Artist' // I include it just for clarity
    },
}, {
    timestamps: true
})

const Album = mongoose.model("Album", albumSchema);

export default Album;