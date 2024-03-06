import { SongController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const songRouter = express.Router();
songRouter.get("/getAll", SongController.getAllSongs);
songRouter.get("/recentSong", verifyToken,SongController.getRecentlyPlayedSongs)
songRouter.get("/streamSong/:songId", SongController.streamSong);
songRouter.post("/uploadSingle", verifyToken, SongController.uploadSong);
songRouter.get("/search/:nameKey", SongController.searchSongByName);
songRouter.post("/addSongStream/:songId", SongController.addStreamSong);

songRouter.get("/leaderboard/topSong/1m", SongController.getAllSongsByLastest);
songRouter.get(
  "/unpublished",
  verifyToken,
  SongController.getUnPublishedSongOfArtist
);
songRouter.get("/getArtistPopularSongs/:artistId", SongController.getPopularSongOfArtist)
songRouter.get("/getFeaturedSongs/:artistId", SongController.getFeaturedSongs)
export default songRouter;
