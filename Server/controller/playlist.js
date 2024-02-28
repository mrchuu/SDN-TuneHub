import PlaylistRepository from '../repository/playlistRepository.js';

// Create a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const playlistData = req.body;
    const newPlaylist = await PlaylistRepository.addPlaylist(playlistData);
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a playlist by ID
export const getPlaylistById = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
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

// Update a playlist
export const updatePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const updateData = req.body;
    const updatedPlaylist = await PlaylistRepository.updatePlaylist(playlistId, updateData);
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a playlist
export const deletePlaylist = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const deletedPlaylist = await PlaylistRepository.deletePlaylist(playlistId);
    res.status(200).json(deletedPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
