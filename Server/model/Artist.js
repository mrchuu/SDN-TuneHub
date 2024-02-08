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
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const albumDTO = new Schema({
  albumId: { type: Schema.Types.ObjectId },
  description: { type: String, required: true },
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
    song_uploads: [songDTO],
    view_count: {
      type: Number,
      required: true,
    },
    albums: [albumDTO],
    followers: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, collection: "Artist" }
);
const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;
