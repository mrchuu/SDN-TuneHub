import {
  ArtistRepository,
  AuthenticateRepository,
  SongRepository,
  SongStreamRepository,
} from "../repository/index.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import jwt from "jsonwebtoken";
import formidable from "formidable";
import { log } from "console";
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
const uploadSong = async (req, res) => {
  try {
    const decodedToken = req.decodedToken;
    const { userId } = decodedToken;
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Access parsed form data
      const songName = fields.songName;
      const genre = fields.genre;
      const participatedArtists = fields.participatedArtists;
      const duration = fields.duration;
      const isExclusive = fields.isExclusive;
      const previewStart = fields.previewStart;
      const previewEnd = fields.previewEnd;
      const price = fields.price;

      // Access the uploaded files
      const coverImage = fields.coverImage;
      const audioFile = files.audioFile;
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      // Assuming audioFile is an array (you might need to adjust based on your structure)
      const uploadedFile = audioFile[0];
      console.log(uploadedFile.originalFilename);
      const newFileName = Date.now() + uploadedFile.originalFilename;
      if (uploadedFile) {
        console.log(uploadedFile.filepath);
        const newPath = path.join(
          __dirname,
          "..",
          `upload`,
          "audio",
          newFileName
        );
        fs.copyFileSync(uploadedFile.filepath, newPath);
        fs.unlinkSync(uploadedFile.filepath);
      }
      const artistResult = await ArtistRepository.findArtistByUserId(userId);
      if (!artistResult) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      console.log(artistResult);
      const result = await SongRepository.uploadSong({
        song_name: songName[0],
        genre: genre[0],
        participated_artist: participatedArtists,
        isExclusive: isExclusive[0] === "true",
        price: parseInt(price[0]),
        file_name: newFileName,
        preview_start_time: parseInt(previewStart[0]),
        preview_end_time: parseInt(previewEnd[0]),
        cover_image: coverImage[0],
        artist: artistResult._id,
        duration: parseInt(duration[0]),
      });
      return res.status(201).json({ message: "song uploaded successfully!!" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export default {
  getAllSongs,
  streamSong,
  addStreamSong,
  uploadSong,
};
