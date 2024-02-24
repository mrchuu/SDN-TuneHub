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
export default {
    findByName
}
