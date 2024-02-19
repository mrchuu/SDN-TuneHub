import mongoose, { Schema } from "mongoose";
import Artist from "./Artist.js";
import Album from "./Album.js";
const userDTO = new Schema({
    userId: { type: Schema.Types.ObjectId },
  });

const songSchema = new Schema(
  {
    song_name: {
      type: String,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
    participated_artist: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
    price: {
      type: Number,
    },
    is_exclusive: {
      type: Boolean,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
    preview_start_time: {
      type: Number,
    },
    preview_end_time: {
      type: Number,
    },
    cover_image: {
      type: String,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    purchased_user: [userDTO],
  },
  { timestamps: true, collection: "Song" }
);
const Song = mongoose.model("Song", songSchema);
export default Song;
