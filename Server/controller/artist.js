import { ArtistRepository } from "../repository/index.js";
const findByName = async (req, res) => {
  try {
    const decodedToken = req.decodedToken;
    const artist = await ArtistRepository.findArtistByUserId(
      decodedToken.userId
    );
    if (!artist) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const searchInput = req.body.artistName;
    const result = await ArtistRepository.findArtistByName({
      searchInput: searchInput,
      artistId: artist._id,
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getRisingArtist = async (req, res) => {
  try {
    const artists = await ArtistRepository.getRisingArtist();
    return res.status(200).json({ data: artists });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const searchArtistByName = async (req, res) => {
  try {
    const artists = await ArtistRepository.searchArtistByName(
      req.params.nameKey
    );
    return res.status(200).json({ data: artists });
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
      message: error.toString(),
    });
  }
};

export default {
  findByName,
  searchArtistByName,
  getRisingArtist,
  getAllHotArtist,
};
