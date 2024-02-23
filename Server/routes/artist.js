import { ArtistController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const artistRouter = express.Router();
artistRouter.get("/findByName/:artistName", ArtistController.findByName);
export default artistRouter;