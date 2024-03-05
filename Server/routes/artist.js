import { ArtistController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const artistRouter = express.Router();
artistRouter.post("/findByName", verifyToken,ArtistController.findByName);
artistRouter.get("/:artistId", ArtistController.getArtistInfo)
artistRouter.get("/search/:nameKey", ArtistController.searchArtistByName);
artistRouter.get("/rising", ArtistController.getRisingArtist);

artistRouter.get("/leaderboard/topArtist", ArtistController.getAllHotArtist)

export default artistRouter;