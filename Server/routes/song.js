import { SongController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const songRouter = express.Router();
songRouter.get("/getAll", SongController.getAllSongs);
songRouter.get("/getSongByAlbum/:id", SongController.getSongsByAlbum);
songRouter.get("/recentSong/:id", SongController.getRecentlyPlayedSongs)
songRouter.get("/recentSong", verifyToken, SongController.getRecentlyPlayedSongs)
songRouter.get("/streamSong/:songId", SongController.streamSong);
songRouter.post("/uploadSingle", verifyToken, SongController.uploadSong);
songRouter.get("/search/:nameKey", SongController.searchSongByName);
songRouter.post("/addSongStream/:songId", SongController.addStreamSong);
songRouter.get("/detailSong/:songId", SongController.getSongDetail)
songRouter.get("/leaderboard/topSong/:date/:check", verifyToken, SongController.getAllSongsByLastest);
songRouter.get(
  "/unpublished",
  verifyToken,
  SongController.getUnPublishedSongOfArtist
);
songRouter.get("/getArtistPopularSongs/:artistId", SongController.getPopularSongOfArtist)
songRouter.get("/getFeaturedSongs/:artistId", SongController.getFeaturedSongs)
songRouter.get("/getHotestSong", verifyToken, SongController.getSongsByLastest)
songRouter.post("/favourited/:songId", verifyToken, SongController.favouritedSong);
export default songRouter;
