import mongoose, { Schema } from "mongoose";
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
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/djzdhtdpj/image/upload/v1704269768/tempAvatar_juqb4s.jpg",
    },
    balance: {
      type: Number,
      default: 0,
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false
    }
  },
  // { timestamps: true, collection: "User" }
);
const User = mongoose.model("user", UserSchema);
// export default User;
