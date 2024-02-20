import { AuthenticateRepository, SongRepository } from "../repository/index.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const getAllSongs = async (req, res) => {
  try {
    const songList = await SongRepository.getAllSongs();
    return res.status(200).json({ data: songList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const streamSong = async (req, res) => {
  try {
    const songId = req.params.songId;
    const existingSong = await SongRepository.getSongsById(songId);
    if (!existingSong) {
      return res.status(400).json({ error: "Song not found!" });
    }
    const fileName = existingSong.file_name;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = await path.resolve(__dirname, "..",`upload`, "audio", fileName);
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath);
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
      fileStream.pipe(res);
    }else{
      return res.status(500).json({error: "File not found, please contact with the artist or the admin!"})
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default {
  getAllSongs,
  streamSong,
};
