import { ArtistController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import artist from "../repository/artist.js";
const artistRouter = express.Router();
artistRouter.post("/findByName", verifyToken,ArtistController.findByName);
artistRouter.get("/getArtistInfo/:artistId", ArtistController.getArtistInfo)
artistRouter.get("/search/:nameKey", ArtistController.searchArtistByName);
artistRouter.get("/explore/rising", ArtistController.getRisingArtist);

artistRouter.get("/leaderboard/topArtist", ArtistController.getAllHotArtist)
artistRouter.get("/getStatistic/:span",verifyToken ,ArtistController.getStatistic)
artistRouter.get("/getTrend/", verifyToken, ArtistController.getSongStreamOrRevenueTrend)
export default artistRouter;