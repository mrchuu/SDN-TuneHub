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
    const artists = await ArtistRepository.searchArtistByName(req.params.nameKey);
    return res.status(200).json({ data: artists });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default {
  findByName,
  searchArtistByName,getRisingArtist
};
