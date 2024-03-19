import express from 'express';
import {UserController} from '../controller/index.js';
import verifyToken from "../middleware/verifyToken.js";
const userRouter = express.Router();

userRouter.put('/change-password',verifyToken, UserController.changePassword);
userRouter.put('/edit-profile', UserController.editProfile);
userRouter.post('/follow',verifyToken, UserController.followArtist);
userRouter.get('/checkFollowed/:artistId',verifyToken, UserController.checkArtistFollowed);
userRouter.get('/artistFollowed/:userId', UserController.getListArtistFollowed);
userRouter.get('/listPlayList/:userId', UserController.getListPlayList);
export default userRouter;