import { ArtistController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const artistRouter = express.Router();
artistRouter.post("/findByName", ArtistController.findByName);
export default artistRouter;