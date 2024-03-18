import Playlist from "../model/Playlist.js";
import PlaylistRepository from "../repository/playlist.js";

import Song from '../model/Song.js';// Import PlaylistRepository module



// Get a playlist by ID
const getPlaylistById = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const playlist = await PlaylistRepository.getPlaylistById(playlistId);
    if (!playlist) {
      res.status(404).json({ error: "Playlist not found" });
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

const createPlaylist = async (req, res) => {
  try {
    const { play_list_name, creator, songs, play_list_cover, stream_time } =
      req.body;
    const result = await PlaylistRepository.createPlaylist({
      play_list_name,
      creator,
      songs,
      play_list_cover,
      stream_time,
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songs } = req.body;
    const result = await PlaylistRepository.addSongToPlaylist({
      playlistId,
      songs,
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllSongsByPlaylistId = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const songList = await PlaylistRepository.getAllSongsByPlaylistId(playlistId);

    if (!songList) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    return res.status(200).json({ data: songList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteSongInPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;
    const updatedPlaylist = await PlaylistRepository.deleteSongInPlaylist(playlistId, songId);
    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default {
  getPlaylistById,
  deletePlaylist,
  getAllPlaylistsByUserId,
  createPlaylist,
  addSongToPlaylist,
  getAllSongsByPlaylistId,
  deleteSongInPlaylist
};
