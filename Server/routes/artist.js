import { ArtistController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const artistRouter = express.Router();
artistRouter.post("/findByName", ArtistController.findByName);

artistRouter.get("/search/:nameKey", ArtistController.searchArtistByName);

artistRouter.get("/leaderboard/topArtist", ArtistController.getAllHotArtist)

export default artistRouter;