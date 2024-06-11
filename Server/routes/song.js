import { SongController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const songRouter = express.Router();
songRouter.get("/getAll", SongController.getAllSongs);
songRouter.get("/getSongByAlbum/:id",SongController.getSongsByAlbum);
songRouter.get("/recentSong", verifyToken,SongController.getRecentlyPlayedSongs)
songRouter.get("/streamSong/:songId", SongController.streamSong);
songRouter.post("/uploadSingle", verifyToken, SongController.uploadSong);
songRouter.get("/search/:nameKey", SongController.searchSongByName);
songRouter.post("/addSongStream/:songId", SongController.addStreamSong);
songRouter.get("/detailSong/:songId", SongController.getSongDetail)
songRouter.get("/leaderboard/topSong1/:date/:check", SongController.getAllSongsByLastest1);
songRouter.get("/leaderboard/topSong/:date/:check", SongController.getAllSongsByLastest);
songRouter.get(
  "/unpublished",
  verifyToken,
  SongController.getUnPublishedSongOfArtist
);
songRouter.get("/getArtistPopularSongs/:artistId", SongController.getPopularSongOfArtist)
songRouter.get("/getFeaturedSongs/:artistId", SongController.getFeaturedSongs)
songRouter.get("/getHotestSong", SongController.getSongsByLastest)
songRouter.post("/favourited/:songId", verifyToken, SongController.favouritedSong);
songRouter.get("/getHotestSong", SongController.getSongsByLastest)
songRouter.get("/getLatest/:limit/:songType", SongController.getLatestSongs)
songRouter.get("/getSongByGenre/:limit/:genreId/:songType", SongController.getSongByGenre)
songRouter.get("/checkFavorite/:songId", SongController.checkFavouriteSong)
songRouter.get("/filterSongByArtist/:date/:sort", SongController.getFilterSongByArtist);
songRouter.post("/disableEnableSong", SongController.disableEnableSong);
export default songRouter;
