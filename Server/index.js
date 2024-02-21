import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { AuthenticationRouter, SongRouter } from "./routes/index.js";
import "./utils/google-oauth2.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
dotenv.config();
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "PUT, POST, GET, DELETE, OPTIONS, PATCH",
  credentials: true, // Allow cookies and other credentials to be sent
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.charset = "UTF-8";
  next();
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/api/auth", AuthenticationRouter);
<<<<<<< HEAD
app.use("/song", SongRouter);

=======
app.use("/api/songs", SongRouter)
>>>>>>> 07f4aacd64dec7345e4a33fe9961a79cdb895fe7
app.use(
  "/upload/image",
  express.static(path.join(__dirname, `upload`, "image"))
);
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
