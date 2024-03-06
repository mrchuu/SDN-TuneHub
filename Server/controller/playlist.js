import PlaylistRepository from '../repository/playlist.js'; // Import PlaylistRepository module

// Create a new playlist
const createPlaylist = async (req, res) => {
  try {
    const playlistData = req.body;
    const newPlaylist = await PlaylistRepository.addPlaylist(playlistData);
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a playlist by ID
const getPlaylistById = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    console.log(playlistId);
    const playlist = await PlaylistRepository.getPlaylistById(playlistId);
    if (!playlist) {
      res.status(404).json({ error: 'Playlist not found' });
    } else {
      res.status(200).json(playlist);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a playlist
const deletePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const deletedPlaylist = await PlaylistRepository.deletePlaylist(playlistId);
    res.status(200).json(deletedPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all playlists by user ID
const getAllPlaylistsByUserId = async (req, res) => {
  try {
    const creator = req.params.creator;
    const playlists = await PlaylistRepository.getAllPlaylistsByUserId(creator);
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createPlaylist,
  getPlaylistById,
  deletePlaylist,
  getAllPlaylistsByUserId
};
