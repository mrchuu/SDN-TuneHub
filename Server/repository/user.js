import mongoose from "mongoose";
import User from "../model/RegisteredUser.js";
import Artist from "../model/Artist.js";

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

const followArtist = async ({ artistId, userId }) => {
  try {
    const user = await User.findById(userId);
    const isFollowed = user.artist_followed.includes(artistId);
    let registerUser;
    if (!isFollowed) {
      registerUser = await User.findByIdAndUpdate(userId, {
        $push: { artist_followed: new mongoose.Types.ObjectId(artistId) },
      });
      await Artist.findByIdAndUpdate(artistId, {
        $push: { followers: new mongoose.Types.ObjectId(userId) },
      });
    } else {
      registerUser = await User.findByIdAndUpdate(userId, {
        $pull: { artist_followed: artistId },
      });
      await Artist.findByIdAndUpdate(artistId, {
        $pull: { followers: userId },
      });
    }
    return registerUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkArtistFollowed = async ({ artistId, userId }) => {
  try {
    const registerUser = await User.findById(userId);
    if (registerUser) {
      const isFollowed = registerUser.artist_followed.includes(artistId);
      return isFollowed;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  findById,
  updateProfile,
  addSongPurchased,
  followArtist,
  checkArtistFollowed,
};
