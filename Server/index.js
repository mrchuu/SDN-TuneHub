import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {AuthenticationRouter} from "./routes/index.js"
const app = express();
dotenv.config();
app.use(cors()); 
app.use(express.json()); 
app.use("/api/auth", AuthenticationRouter)
const port = process.env.PORT || 9999;
const MONGODB_URI = process.env.MONGODB_URI;
app.listen(port, async () => {
  try {
    mongoose.connect(MONGODB_URI).then(() => {
      console.log("Successfully connected to atlas");
    });
  } catch (error) {
    console.log(`Something went wrong: ${error.message}`);
  }
  console.log(`Server running on http://localhost:${port}`);
});
