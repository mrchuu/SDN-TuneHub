import { ReportquestionController } from "../controller/index.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";

const reportquestionRouter = express.Router();
reportquestionRouter.get("/getReportQuestion", ReportquestionController.getQuestionReport);
reportquestionRouter.post("/addReport/:commentReportedId",verifyToken, ReportquestionController.addReport);
export default reportquestionRouter;