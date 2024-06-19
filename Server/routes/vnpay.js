import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const vnpayRouter = express.Router();
import { VnpayController } from "../controller/index.js";
vnpayRouter.post(
  "/create_payment_url",
  verifyToken,
  VnpayController.purchaseSong
);
vnpayRouter.get("/vnpay_return", VnpayController.purchaseSongReturn);
vnpayRouter.post("/donateArtist", verifyToken, VnpayController.donateArtist);
vnpayRouter.get("/donateReturn", VnpayController.donateReturn);
export default vnpayRouter;
