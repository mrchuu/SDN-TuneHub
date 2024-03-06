import Playlist from '../model/Playlist.js'; // Import Playlist model

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
    const playlists = await Playlist.find({creator:creator}); // Use Playlist model to get all playlists by a user ID
    return playlists;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  addPlaylist,
  getPlaylistById,
  deletePlaylist,
  getAllPlaylistsByUserId
};
