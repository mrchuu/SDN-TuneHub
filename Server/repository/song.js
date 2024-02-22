import Song from "../model/Song.js";
import SongStreamRepository from "./songStream.js";
const getAllSongs = async () =>{
    try {
        const songList = await Song.find().populate('artist').populate('album').exec();
        return songList;
    } catch (error) {
        throw new Error(error.message)
    }
}
const getSongsById = async (songId) =>{
    try {
        const existingSong = await Song.findById(songId).populate('artist').populate('album').exec();
        return existingSong
    } catch (error) {
        throw new Error(error.message)
    }
}
const streamSong = async (songId, userId) =>{
    try {
        const songStream = await SongStreamRepository.addSongStreamm({userId:userId, songId:songId});
        return songStream;
    } catch (error) {
        throw new Error(error.message)
    }
}
export default {
    getAllSongs,
    streamSong,
    getSongsById
}