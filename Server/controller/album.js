import {
  AlbumRepository,
  ArtistRepository,
  SongRepository,
} from "../repository/index.js";

const addAlbum = async (req, res) => {
  try {
    const decodedToken = req.decodedToken;
    console.log(req.body);
    const { album_cover, album_name, background, description, price, songs } =
      req.body;
    const artist = await ArtistRepository.findArtistByUserId(
      decodedToken.userId
    );
    if (!artist) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const newAlbum = await AlbumRepository.createAlbum({
      artist: artist._id,
      album_name,
      songs: songs,
      description,
      album_cover,
      price,
      background
    });
    const songIds = newAlbum.songs.map((song) => song._id);
    const songsUpdate = await SongRepository.makePublic(songIds);
    return res.status(201).json({message: "New album has been published !!"})
  } catch (error) {}
};
export default {
  addAlbum,

};
