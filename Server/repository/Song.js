import Song from "../model/Song.js";
const getAllSongs = async () =>{
    try {
        const songList = await Song.find().populate('artist').populate('Album').exec();
        return songList;
    } catch (error) {
        throw new Error(error.message)
    }
}

export default {
    getAllSongs
}