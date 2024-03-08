import Playlist from "../model/Playlist.js"; // Import Playlist model
import User from "../model/RegisteredUser.js";
import Song from '../model/Song.js';// Import PlaylistRepository module
import mongoose from 'mongoose';


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
    const deletedPlaylist = await Playlist.findOneAndDelete(playlistId);
    return deletedPlaylist;
  } catch (error) {
    throw new Error(error.message);
  }
};


// Get all playlists by user ID
const getAllPlaylistsByUserId = async (creator) => {
  try {
    const playlists = await Playlist.find({ creator: creator });
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
  };
}

// const getPlaylistById = async (playlistId) => {

//   try {
//     const playlist = await Playlist.findById(playlistId);
//     return playlist;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const getAllSongsByPlaylistId = async (playlistId) => {
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      throw new Error("Playlist not found");
    }
    const songIds = playlist.songs.map(song => song.songId);
    const songList = await Song.find({ _id: { $in: songIds } })
      .populate({
        path: 'artist',
        select: '_id artist_name'
      })
      .populate({
        path: 'album',
        select: '_id album_name'
      })
      .select('_id song_name is_exclusive album cover_image artist duration');
    return songList;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteSongInPlaylist = async (playlistId, songId) => {
  try {
    // Tìm playlist bằng playlistId
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      throw new Error("Playlist not found");
    }
    const songIndex = playlist.songs.find(song => song.songId === songId);
    if (songIndex === -1) {
      throw new Error("Song not found in the playlist");
    }
    playlist.songs.splice(songIndex, 1);
    await playlist.save();
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
  getAllSongsByPlaylistId,
  deleteSongInPlaylist
};
