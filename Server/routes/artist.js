import { ArtistController } from "../controller/index.js";
import express from "express";
const artistRouter = express.Router();

artistRouter.get("/search/:nameKey", ArtistController.searchArtistByName);

export default artistRouter;