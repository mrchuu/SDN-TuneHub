import mongoose, { Schema } from "mongoose";
import User from "./RegisteredUser";
import Song from "./Song";

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId },
    songId: { type: Schema.Types.ObjectId },
    parent_comment: { type: Schema.Types.ObjectId },
    content: {
      type: String,
    },
    is_root: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, collection: "Comment" }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
