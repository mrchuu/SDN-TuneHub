import mongoose, { Schema } from "mongoose";
import Song from "./Song.js";

const songDTO = new Schema({
  songId: { type: Schema.Types.ObjectId },
  artist: {
    type: String
  }
});

const userDTO = new Schema({
  userId: { type: Schema.Types.ObjectId },
  user_name: {
    type: String
  }
});

const reportsSchema = new Schema(
  {
    reporter: userDTO,
    song_reported: { type: songDTO, default: null },
    comment_reported: { type: Schema.Types.ObjectId, default: null },
  },
  { timestamps: true, collection: "Report" }
);
const Report = mongoose.model("Report", reportsSchema);
export default Report;