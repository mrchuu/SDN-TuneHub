import { AuthenticationController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import passport from "passport";
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
authenticationRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authenticationRouter.get(
  "/google/callback",
  passport.authenticate("google", {session: false}),
  AuthenticationController.oauth2GoogleAuthentication
);
authenticationRouter.post("/googleLogin", AuthenticationController.googleLogin)
export default authenticationRouter;
