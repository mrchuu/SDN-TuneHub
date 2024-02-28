import Playlist from '../models/playlistModel.js';

// Add a new playlist
export const addPlaylist = async (playlistData) => {
  try {
    const newPlaylist = await Playlist.create(playlistData);
    return newPlaylist;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get playlist by ID
export const getPlaylistById = async (playlistId) => {
  try {
    const playlist = await Playlist.findById(playlistId);
    return playlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update playlist
export const updatePlaylist = async (playlistId, updateData) => {
  try {
    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, updateData, { new: true });
    return updatedPlaylist;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete playlist
export const deletePlaylist = async (playlistId) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);
    return deletedPlaylist;
  } catch (error) {
    throw new Error(error.message);
  }
};
