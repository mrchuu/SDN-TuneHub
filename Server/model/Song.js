import mongoose, { Schema } from "mongoose";
import Artist from "./Artist.js";
import Album from "./Album.js";

const songSchema = new Schema(
  {
    song_name: {
      type: String,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
    participated_artist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        default: [],
      },
    ],
    price: {
      type: Number,
    },
    is_exclusive: {
      type: Boolean,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "album",
    },
    file_name: {
      type: String,
      required: true,
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
    duration: {
      type: Number,
      required: true,
    },
    is_public: {
      type: Schema.Types.Boolean,
      default: true
    },
    favourited:
      [{ type: Schema.Types.ObjectId }],
    purchased_user:
      [{ type: Schema.Types.ObjectId }],
  },
  { timestamps: true, collection: "Song" }
);
const Song = mongoose.model("Song", songSchema);
export default Song;
