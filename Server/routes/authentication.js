import { AuthenticationController } from "../controller/index.js";
import express from "express";
const authenticationRouter = express.Router();
authenticationRouter.post("/", AuthenticationController.authenticate);
authenticationRouter.post("/signup", AuthenticationController.signUp);
authenticationRouter.patch("/verify/:token", AuthenticationController.verifyUser);
export default authenticationRouter;
