import { SongControler } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const songRouter = express.Router();

songRouter.get("/search/:name", SongControler.searchSongByName);
songRouter.get('/',SongControler.getSong)

export default songRouter;
