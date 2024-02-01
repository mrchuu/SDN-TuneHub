import { AuthenticationController } from "../controller/index.js";
import express from "express";
const authenticationRouter = express.Router();
authenticationRouter.post("/", AuthenticationController.authenticate);
export default authenticationRouter;
