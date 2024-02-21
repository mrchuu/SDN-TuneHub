import mongoose, { Schema } from "mongoose";
import User from "./RegisteredUser.js";
import Album from "./Album.js";
const songDTO = new Schema({
  songId: { type: Schema.Types.ObjectId },
  song_name: {
    required: true,
    type: String,
  },
  song_cover: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

const albumDTO = new Schema({
  albumId: { type: Schema.Types.ObjectId },
  album_name: { type: String, required: true },
  album_cover: { type: String, required: true },
  price: { type: Number, required: true },
});

const ArtistSchema = new Schema(
  {
    artist_name: {
      type: String,
      required: true,
    },
    song_uploads: {
      type: [songDTO],
      default: [],
    },
    albums: {
      type: [albumDTO],
      default: [],
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, collection: "Artist" }
);
const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;
