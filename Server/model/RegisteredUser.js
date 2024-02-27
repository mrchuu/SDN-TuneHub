import mongoose, { Schema } from "mongoose";
import Artist from "./Artist.js";
import Playlist from './Playlist.js'
import Song from "./Song.js";

const playlistDTO = new Schema({
  playlistId: {
    type: Schema.Types.ObjectId,
  },
  play_list_name: {
    type: String,
  },
  play_list_cover: {
    type: String,
  },
});

const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      default: ""
    },
    profile_picture: {
      type: String,
      default:
        "https://res.cloudinary.com/djzdhtdpj/image/upload/v1704269768/tempAvatar_juqb4s.jpg",
    },
    playlist_created: {
      type: [playlistDTO],
      default: [],
    },
    playlist_created: {
      type: [{ type: Schema.Types.ObjectId }],
      default: [],
    },
    artist_followed: {
      type: [Schema.Types.ObjectId],
      ref: "Artist",
      default: [],
    },
    balance: {
      type: Number,
      default: 0,
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    }
  },
  { timestamps: true, collection: "Users" }
);
const User = mongoose.model("User", UserSchema);
export default User;
