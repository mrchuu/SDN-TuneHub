import express from "express";
import {LeaderBoardController} from "../controller/index.js";

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/', LeaderBoardController.getAllSongsByLastest);

export default leaderBoardRouter;
