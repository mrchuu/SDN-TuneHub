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

export default {
    getAllSongsByLastest
}