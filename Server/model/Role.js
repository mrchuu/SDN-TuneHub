import mongoose, { Schema } from "mongoose";
import User from './RegisteredUser'

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    user: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true, collection: "Role" }
);

const Role = mongoose.model("Role", RoleSchema);
export default Role;
