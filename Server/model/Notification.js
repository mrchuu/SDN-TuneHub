import mongoose, { Schema } from "mongoose";

const userDTO = new Schema({
    userId: { type: Schema.Types.ObjectId },
});

const NotificationSchema = new Schema(
  {
    content: {
        type: String,
        require: true
    },
    user: userDTO
  },
  { timestamps: true,collection: "Notification" }
);

//   { collection: "products", timestamps: true }

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;