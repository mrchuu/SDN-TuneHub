import { AuthenticationController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const authenticationRouter = express.Router();
authenticationRouter.post("/login", AuthenticationController.login);
authenticationRouter.get(
  "/user",
  verifyToken,
  AuthenticationController.getUserInfo
);
authenticationRouter.post("/signup", AuthenticationController.signUp);
authenticationRouter.patch(
  "/verify/:token",
  AuthenticationController.verifyUser
);
authenticationRouter.get(
  "/refreshToken",
  AuthenticationController.refreshToken
);
authenticationRouter.get("/logOut", AuthenticationController.logOut);
export default authenticationRouter;
