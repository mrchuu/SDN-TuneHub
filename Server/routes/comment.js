import { CommentController } from "../controller/index.js";
import express from "express";
const commentRouter = express.Router();
commentRouter.get("/getAllComments/:songId", CommentController.getAllComents);
commentRouter.post("/add", CommentController.addComments);
export default commentRouter;