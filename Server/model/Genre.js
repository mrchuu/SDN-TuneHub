import mongoose, { Schema } from "mongoose";

const GenreSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
  },
  { timestamps: true, collection: "Genre"}
);

const Genre = mongoose.model("Genre", GenreSchema);
export default Genre;