import { AuthenticateRepository, SongRepository, SongStreamRepository } from "../repository/index.js";
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
let currentStream; // Variable to hold the current stream

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
    const filePath = path.resolve(__dirname, "..", `upload`, "audio", fileName);

    if (fs.existsSync(filePath)) {
      // if(existingSong.is_exclusive){
      //   const fileSize = fs.statSync(filePath).size();
      //   const startTime  = Math.floor((existingSong.preview_start_time/existingSong.preview_end_time)*fileSize)
      //   const endTime = Math.floor((existingSong.preview_start_time/existingSong.preview_end_time)*fileSize)
      // }
      const fileStream = fs.createReadStream(filePath);
      res.setHeader("Content-Type", "audio/mpeg");
      // fileStream.on("error", (err) => {
      //   console.error(`Error in stream for ${fileName}:`, err);
      //   res.status(500).json({ error: "Internal Server Error" });
      // });

      // Log when the stream ends
      // fileStream.on("end", () => {
      //   console.log(`Stream for ${fileName} ended`);
      //   res.end();
      // });

      // Log the stream data
      // fileStream.on("data", (chunk) => {
      //   console.log(`Received chunk of data: ${chunk.length} bytes`);
      // });
      fileStream.pipe(res);
     
    } else {
      return res
        .status(500)
        .json({
          error: "File not found, please contact with the artist or the admin!",
        });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const addStreamSong = async (req, res) =>{
  try {
    const decodedToken = req.decodedToken;
    const existingUser = await AuthenticateRepository.getUserById(decodedToken.userId);
    if(!existingUser){
      return res.status(400).json({error: "User was not found"})
    } 
    const songId = req.params.songId;
    const existingSong = await SongRepository.getSongsById(songId);
    if(!existingSong){
      return res.status(400).json({error: "Song was not found"})
    }
    const songStream = SongStreamRepository.addSongStreamm({userId: existingUser._id, songId: existingSong._id});
    return res.status(201).json({result: "song stream added"})
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}
export default {
  getAllSongs,
  streamSong,
  addStreamSong
};
