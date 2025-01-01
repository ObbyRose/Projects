import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    spotifySongId: { type: String, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    albumName: { type: String, required: true },
    albumCover: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in seconds
});

const Song = mongoose.model('Song', songSchema);
export default Song;
