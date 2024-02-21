import { SongController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const songRouter = express.Router();
songRouter.get("/getAll", SongController.getAllSongs);
songRouter.get("/streamSong/:songId", SongController.streamSong);
songRouter.post(
  "/addSongStream/:songId",
  verifyToken,
  SongController.addStreamSong
);
export default songRouter;
