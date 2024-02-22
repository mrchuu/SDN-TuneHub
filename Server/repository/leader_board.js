import Song from "../model/Song.js";

const getAllSongByLastest = async () => {
    try {
        const allSongs = await Song.find({}).exec();
        return allSongs;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default {
    getAllSongByLastest
}