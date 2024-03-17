import mongoose from "mongoose";
import User from "../model/RegisteredUser.js";

const findById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateProfile = async (
  id,
  { firstName, lastName, introduction, profilePicture }
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        first_name: firstName,
        last_name: lastName,
        introduction: introduction,
        profile_picture: profilePicture,
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
const addSongPurchased = async (userId, songId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { songs_purchased: new mongoose.Types.ObjectId(songId) },
      },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { findById, updateProfile, addSongPurchased };
