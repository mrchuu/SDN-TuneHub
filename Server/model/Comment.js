import mongoose, { Schema } from "mongoose";

const userDTO = new Schema({
  userId: { type: Schema.Types.ObjectId },
});
const songDTO = new Schema({
  songId: { type: Schema.Types.ObjectId },
});
const commentDTO = new Schema({
    commentId: {type: Schema.Types.ObjectId},
})

const CommentSchema = new Schema(
  {
    user: userDTO,
    songId: songDTO,
    parent_comment: commentDTO,
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
