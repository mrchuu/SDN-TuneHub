import { AlbumController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const albumRouter = express.Router();
albumRouter.post("/add", verifyToken, AlbumController.addAlbum)
export default albumRouter;