import { LeaderBoardRepository } from '../repository/index.js';

const getAllSongsByLastest = async (req, res) => {
    try {
        const songs = await LeaderBoardRepository.hotestSongByDay();
        res.status(200).json(songs);

    } catch (error) {
        getAllSongsByLastest.res.status(500).json({
            message: error.toString()
        });
    }
}

const getAllHotArtist = async (req, res) => {
    try {
        const artists = await LeaderBoardRepository.hotArtist();
        res.status(200).json(artists);

    } catch (error) {
        getAllSongsByLastest.res.status(500).json({
            message: error.toString()
        });
    }
}

export default {
    getAllSongsByLastest,
    getAllHotArtist
}