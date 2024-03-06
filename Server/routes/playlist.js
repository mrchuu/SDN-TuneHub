import express from "express";
import { PlaylistController } from "../controller/index.js";
import verifyToken from "../middleware/verifyToken.js";

const playlistRouter = express.Router();

// Route to create a new playlist
playlistRouter.post("/addPlaylist/:creator", PlaylistController.createPlaylist);

// Route to get a playlist by ID
playlistRouter.get("/getPlaylistById/:playlistId", PlaylistController.getPlaylistById);

// Route to delete a playlist
playlistRouter.delete("/deletePlaylist/:playlistId", PlaylistController.deletePlaylist);

// Route to get all playlists by user ID
playlistRouter.get("/getAllPlaylistsByUserId/:creator", PlaylistController.getAllPlaylistsByUserId);

export default playlistRouter;
