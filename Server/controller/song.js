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
    if (fs.existsSync(filePath)) {
      const { is_exclusive, preview_start_time, preview_end_time } =
        existingSong;
      if (
        is_exclusive &&
        userId &&
        !existingSong.purchased_user.includes(userId)
      ) {
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
        throw new Error(err.message);
      }
      const songName = fields.songName ? fields.songName[0] : null;
      const genre = fields.genre ? fields.genre : null;
      const participatedArtists =
        fields.participatedArtists[0] !== ""
          ? fields.participatedArtists
          : null;
      const duration = fields.duration ? parseInt(fields.duration[0]) : null;
      const isExclusive = fields.isExclusive
        ? fields.isExclusive[0] === "true"
        : false;
      const previewStart = fields.previewStart
        ? parseInt(fields.previewStart[0])
        : null;
      const previewEnd = fields.previewEnd
        ? parseInt(fields.previewEnd[0])
        : null;
      const price = fields.price ? parseInt(fields.price[0]) : null;
      // Access the uploaded files
      const coverImage = fields.coverImage ? fields.coverImage[0] : null;
      const artist = await ArtistRepository.findArtistByUserId(userId);
      if (!artist) {
        throw new Error("Unauthorized");
      }
      console.log(participatedArtists);
      const audioFile = files.audioFile;
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      // Assuming audioFile is an array (you might need to adjust based on your structure)
      const uploadedFile = audioFile[0];
      const newFileName = Date.now() + uploadedFile.originalFilename;
      if (uploadedFile) {
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

      const result = await SongRepository.uploadSong({
        song_name: songName,
        genre: genre,
        participated_artist: participatedArtists,
        isExclusive: isExclusive,
        price: price,
        file_name: newFileName,
        preview_start_time: previewStart,
        preview_end_time: previewEnd,
        cover_image: coverImage,
        artist: artist._id,
        duration: duration,
      });
      ArtistRepository.addSongUpload({
        artistId: artist._id,
        songId: result._id,
        songName: result.song_name,
        songCover: result.cover_image,
        isExclusive: result.isExclusive
      });
      return res.status(201).json({ message: "song uploaded successfully!!" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchSongByName = async (req, res) => {
  try {
    const songs = await SongRepository.searchSongByName(req.params.nameKey);
    res.status(201).json(songs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default {
  getAllSongs,
  streamSong,
  addStreamSong,
  uploadSong,
  searchSongByName,
};
