import { ArtistRepository } from "../repository/index.js";
const findByName = async (req, res) => {
  try {
    const searchInput = req.body.artistName;
    console.log(searchInput);
    const result = await ArtistRepository.findArtistByName(searchInput);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const searchArtistByName = async (req, res) => {
  try {
    const songs = await ArtistRepository.searchArtistByName(req.params.nameKey);
    res.status(201).json(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllHotArtist = async (req, res) => {
  try {
      const artists = await ArtistRepository.hotArtist();
      res.status(200).json(artists);

  } catch (error) {
      getAllSongsByLastest.res.status(500).json({
          message: error.toString()
      });
  }
}

export default {
  findByName,
  searchArtistByName,
  getAllHotArtist
};
