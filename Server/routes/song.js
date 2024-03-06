import { SongController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const songRouter = express.Router();
songRouter.get("/getAll", SongController.getAllSongs);
songRouter.get("/recentSong/:id",SongController.getRecentlyPlayedSongs)
songRouter.get("/streamSong/:songId", SongController.streamSong);
songRouter.post("/uploadSingle", verifyToken, SongController.uploadSong);
songRouter.get("/search/:nameKey", SongController.searchSongByName);
songRouter.post("/addSongStream/:songId", SongController.addStreamSong);
songRouter.get("/detailSong/:songId", SongController.getSongDetail)
songRouter.get("/leaderboard/topSong/:date", SongController.getAllSongsByLastest);
songRouter.get(
  "/unpublished",
  verifyToken,
  SongController.getUnPublishedSongOfArtist
);
songRouter.get("/getArtistPopularSongs/:artistId", SongController.getPopularSongOfArtist)
export default songRouter;
