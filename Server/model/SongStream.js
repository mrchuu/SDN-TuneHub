import mongoose, { Schema } from "mongoose";
import User from "./RegisteredUser";

const userDTO = new Schema({
  userId: { type: Schema.Types.ObjectId },
});
const songDTO = new Schema({
    songId: { type: Schema.Types.ObjectId },
});

const SongStreamSchema = new Schema(
  {
    user: userDTO,
    song: songDTO
  },
  { timestamps: true, collection: "SongStream" }
);

const SongStream = mongoose.model("SongStream", SongStreamSchema);
export default SongStream;
