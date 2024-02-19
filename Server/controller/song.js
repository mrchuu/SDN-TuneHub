import { SongRepository } from "../repository/index.js";

const getAllSongs = async (req, res) => {
  try {
    const songList = await SongRepository.getAllSongs();
    return res.status(200).json({ data: songList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default {
    getAllSongs
}