import { AlbumController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const albumRouter = express.Router();
albumRouter.get("/getAllAlbums",AlbumController.getAllAlbums);
albumRouter.post("/add", verifyToken, AlbumController.addAlbum);
albumRouter.get(
  "/getAlbumsOfArtist/:artistId",
  AlbumController.getAlbumsOfArtists
);
albumRouter.get("/getHotAlbum", AlbumController.getAllHotAlbums)
albumRouter.get("/getAlbumById/:id",AlbumController.getAlbumById);
albumRouter.get("/filterAlbumByArtist/:date/:sort",AlbumController.getFilterAlbumByArtist);

export default albumRouter;
