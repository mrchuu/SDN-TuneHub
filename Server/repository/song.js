import Song from "../model/Song.js";

const searchSongByName = async (name) => {
  try {
    const foundSongs = await Song.find({
      song_name: { $regex: name, $options: "i" },
    }).exec();

    if (foundSongs.length === 0) {
      return res
        .status(400)
        .json({ error: "No songs found with the provided name" });
    }

    return foundSongs;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getSongs = async () => {
  try {
    const foundSongs = await Song.find({}).exec();
    return foundSongs;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  searchSongByName,getSongs
};
