import mongoose, { Schema } from "mongoose";
import User from "./RegisteredUser.js";


const NotificationSchema = new Schema(
  {
    content: {
        type: String,
        require: true
    },
    user: { type: Schema.Types.ObjectId }
  },
  { timestamps: true,collection: "Notification" }
);

//   { collection: "products", timestamps: true }

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;