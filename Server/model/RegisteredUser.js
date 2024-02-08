import mongoose, { Schema } from "mongoose";

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

const songDTO = new Schema({
    songId: { type: Schema.Types.ObjectId },
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
    },
    profile_picture: {
      type: String,
      default:
        "https://res.cloudinary.com/djzdhtdpj/image/upload/v1704269768/tempAvatar_juqb4s.jpg",
    },
    playlist_created: [playlistDTO],
    playlist_created: [songDTO],
    artist_followed: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: "User" }
);
const User = mongoose.model("User", UserSchema);
export default User;
