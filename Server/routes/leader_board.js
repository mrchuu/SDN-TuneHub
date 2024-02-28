import express from "express";
import {LeaderBoardController} from "../controller/index.js";

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/songs', LeaderBoardController.getAllSongsByLastest);
leaderBoardRouter.get('/artists', LeaderBoardController.getAllHotArtist);

export default leaderBoardRouter;
