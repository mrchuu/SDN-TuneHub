import { SongRepository } from "../repository/index.js";
import Song from "../model/Song.js";

const searchSongByName = async (req, res) => {
  try {
    const songs = await SongRepository.searchSongByName(req.params.name);
    res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getSong = async (req, res) => {
  try {
    console.log("aaaaaaaaaaaaaaa");
    const songs = await SongRepository.getSongs();
    return res.status(200).json(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  searchSongByName,getSong
};
