import Song from "../model/Song.js";
import { SongRepository } from "./index.js";
import SongStreamRepository from "./songStream.js";
import artist from "./artist.js";
const getAllSongs = async () => {
  try {
    const songList = await Song.find()
      .populate("artist", "_id artist_name")
      .populate("album")
      .select("_id")
      .select("song_name")
      .select("cover_image")
      .select("duration")
      .select("is_exclusive");
    return songList;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getSongsById = async (songId) => {
  try {
    const existingSong = await Song.findById(songId)
      .populate("artist")
      .populate("album")
      .exec();
    return existingSong;
  } catch (error) {
    throw new Error(error.message);
  }
};
const streamSong = async (songId, userId) => {
  try {
    const songStream = await SongStreamRepository.addSongStreamm({
      userId: userId,
      songId: songId,
    });
    return songStream;
  } catch (error) {
    throw new Error(error.message);
  }
};

const uploadSong = async ({
  song_name,
  genre,
  participated_artist,
  isExclusive,
  price,
  album,
  file_name,
  preview_start_time,
  preview_end_time,
  cover_image,
  artist,
  duration,
}) => {
  console.log(artist);
  try {
    const result = Song.create({
      song_name,
      genre,
      participated_artist,
      is_exclusive: isExclusive,
      price,
      album,
      file_name,
      preview_start_time,
      preview_end_time,
      cover_image,
      artist: artist,
      duration,
    });
    return result._doc;
  } catch (error) {
    throw new Error(error.message);
  }
};
const searchSongByName = async (name) => {
  try {
    const foundSongs = await Song.aggregate([
      {
        $match: { song_name: { $regex: name, $options: "i" } },
      },
      {
        $lookup: {
          from: "SongStream",
          localField: "_id",
          foreignField: "song",
          as: "streamTime",
        },
      },
      {
        $addFields: {
          lastStreamTime: { $max: "$streamTime.createdAt" },
        },
      },
      {
        $addFields: {
          streamCount: { $size: "$streamTime" },
        },
      },
      {
        $lookup: {
          from: "Artist",
          localField: "artist",
          foreignField: "_id",
          as: "artist_file",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "artist_file.userId",
          foreignField: "_id",
          as: "users_file",
        },
      },
      {
        $lookup: {
          from: "Album",
          localField: "album",
          foreignField: "_id",
          as: "album_file",
        },
      },
      {
        $group: {
          _id: "$_id",
          song_name: { $first: "$song_name" },
          is_exclusive: { $first: "$is_exclusive" },
          album: {
            $first: {
              _id: { $arrayElemAt: ["$album_file._id", 0] },
              artist: { $arrayElemAt: ["$album_file.artist", 0] },
              album_name: { $arrayElemAt: ["$album_file.album_name", 0] },
              album_cover: { $arrayElemAt: ["$album_file.album_cover", 0] },
            },
          },
          artist: {
            $first: {
              _id: { $arrayElemAt: ["$artist_file._id", 0] },
              artist_name: { $arrayElemAt: ["$artist_file.artist_name", 0] },
            },
          },
          duration: { $first: "$duration" },
          cover_image: { $first: "$cover_image" },
          streamCount: { $first: "$streamCount" },
          lastStreamTime: { $first: "$lastStreamTime" },
        },
      },
      {
        $project: {
          _id: "$_id",
          song_name: "$song_name",
          is_exclusive: "$is_exclusive",
          album: "$album",
          artist: "$artist",
          duration: "$duration",
          cover_image: "$cover_image",
        },
      },
      {
        $sort: { streamCount: -1 },
      },
      {
        $limit: 10,
      },
      {
        $sort: { lastStreamTime: -1 },
      },
    ]).exec();

    if (foundSongs.length === 0) {
      throw new Error("No songs found with the provided name");
    }

    return foundSongs;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  getAllSongs,
  streamSong,
  getSongsById,
  uploadSong,
  searchSongByName,
};
