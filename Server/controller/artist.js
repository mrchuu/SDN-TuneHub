import { ArtistRepository } from "../repository/index.js";

const searchArtistByName = async (req, res) => {
  try {
    const songs = await ArtistRepository.searchArtistByName(req.params.nameKey);
    res.status(201).json(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  searchArtistByName,
};
