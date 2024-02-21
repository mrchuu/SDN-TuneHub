import mongoose, { Schema } from "mongoose";

const songDTO = new Schema({
  songId: { type: Schema.Types.ObjectId },
  song_name: {
    required: true,
    type: String,
  },
  song_cover: {
    type: String,
    required: true,
  }
});

const userDTO = new Schema({
  userId: { type: Schema.Types.ObjectId },
});

const albumSchema = new Schema(
  {
    artist: { type:Schema.Types.ObjectId, ref: "Artist" },
    album_name: {
        type: String
    },
    songs: [songDTO],
    description: {
        type: String
    },
    purchasers: [userDTO],
    album_cover: {
        type: String
    },
    price: {
        type: Number
    },
  },
  {timestamps: true, collection: "Album"}
);
const Album = mongoose.model("album", albumSchema);
export default Album;