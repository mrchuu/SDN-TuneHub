import mongoose, { Schema } from "mongoose";

const albumSchema = new Schema(
  {
    artist: { type:Schema.Types.ObjectId, ref: "Artist" },
    album_name: {
        type: String
    },
    songs: [{}],
    description: {
        type: String
    },
    purchasers: [{}],
    album_cover: {
        type: String
    },
    price: {
        type: Number
    },
  },
  {timestamps: true, collection: "Album"}
);
const Album = mongoose.model("Album", albumSchema);
export default Album;