
import {
  AuthenticateRepository,
  SongRepository,
  SongStreamRepository,
} from "../repository/index.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import jwt from "jsonwebtoken";
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
    const filePath = path.resolve(__dirname, "..", `upload`, "audio", fileName);

    if (fs.existsSync(filePath)) {
      const { is_exclusive, preview_start_time, preview_end_time } =
        existingSong;
      console.log(
        is_exclusive + " " + preview_end_time + " " + preview_start_time
      );
      if (is_exclusive) {
        const ffmpegCmd = ffmpeg(filePath)
          .setStartTime(preview_start_time)
          .setDuration(preview_end_time - preview_start_time)
          .audioCodec("libmp3lame")
          .format("mp3");
        res.setHeader("Content-Type", "audio/mpeg");
        ffmpegCmd.pipe(res, { end: true });
      } else {
        const fileStream = fs.createReadStream(filePath);
        res.setHeader("Content-Type", "audio/mpeg");
        fileStream.pipe(res);
      }
    } else {
      return res.status(500).json({
        error: "File not found, please contact with the artist or the admin!",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addStreamSong = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    let userId;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const existingUser = await AuthenticateRepository.getUserById(
        decodedToken.userId
      );
      if (!existingUser) {
        return res.status(400).json({ error: "User was not found" });
      }
      userId = existingUser._id;
    }

    const songId = req.params.songId;
    const existingSong = await SongRepository.getSongsById(songId);
    if (!existingSong) {
      return res.status(400).json({ error: "Song was not found" });
    }
    const songStream = SongStreamRepository.addSongStreamm({
      userId: userId,
      songId: existingSong._id,
    });
    return res.status(201).json({ result: "song stream added" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default {
  getAllSongs,
  streamSong,
  addStreamSong,
};
