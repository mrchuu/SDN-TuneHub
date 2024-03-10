import Playlist from "../model/Playlist.js"; // Import Playlist model
import User from "../model/RegisteredUser.js";
import Song from "../model/Song.js";

// Add a new playlist
const addPlaylist = async (playlistData) => {
  try {
    const newPlaylist = await Playlist.create(playlistData);
    return newPlaylist;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get playlist by ID
const getPlaylistById = async (playlistId) => {
  console.log("sos" + playlistId);
  try {
    const playlist = await Playlist.findById(playlistId);
    return playlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete playlist
const deletePlaylist = async (playlistId) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);
    return deletedPlaylist;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all playlists by user ID
const getAllPlaylistsByUserId = async (creator) => {
  try {
    const playlists = await Playlist.find({ creator: creator }); // Use Playlist model to get all playlists by a user ID
    return playlists;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createPlaylist = async ({
  play_list_name,
  creator,
  songs,
  play_list_cover,
  stream_time,
}) => {
  try {
    if (songs) {
      const songDTO = await Song.findById(songs);
      const playlist = await Playlist.create({
        play_list_name: songDTO.song_name,
        creator,
        songs: {
          songId: songDTO._id,
          song_name: songDTO.song_name,
          is_exclusive: songDTO.is_exclusive,
          start_time: songDTO.preview_start_time,
          end_time: songDTO.preview_end_time,
          cover_image: songDTO.cover_image,
        },
        play_list_cover,
        stream_time,
      });

      return playlist;
    } else {
      const playlist = await Playlist.create({
        play_list_name,
        creator,
        songs,
        play_list_cover,
        stream_time,
      });

      await User.findOneAndUpdate(
        {
          _id: creator,
        },
        {
          $push: {
            playlist_created: {
              playlistId: playlist._id,
              play_list_name: play_list_name,
              play_list_cover: play_list_cover,
            },
          },
        }
      );

      return playlist;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const addSongToPlaylist = async ({ playlistId, songs }) => {
  try {
    const songDTO = await Song.findById(songs);
    const playlist = await Playlist.findByIdAndUpdate(playlistId, {
      $push: {
        songs: {
          songId: songDTO._id,
          song_name: songDTO.song_name,
          is_exclusive: songDTO.is_exclusive,
          start_time: songDTO.preview_start_time,
          end_time: songDTO.preview_end_time,
          cover_image: songDTO.cover_image,
        },
      },
    });
    return playlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  addPlaylist,
  getPlaylistById,
  deletePlaylist,
  getAllPlaylistsByUserId,
  createPlaylist,
  addSongToPlaylist,
};