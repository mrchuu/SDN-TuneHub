import express from "express";
import verifyToken from "../middleware/verifyToken.js";
const vnpayRouter = express.Router();
import { VnpayController } from "../controller/index.js";
vnpayRouter.post("/create_payment_url", verifyToken, VnpayController.createPaymentUrl);
vnpayRouter.get("/vnpay_return", VnpayController.vnpayReturn);
export default vnpayRouter;
