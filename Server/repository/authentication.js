import Genre from "../model/Genre.js";
import Song from "../model/Song.js";
import Album from "../model/Album.js";
import Artist from '../model/Artist.js'
import Comment from "../model/Comment.js";
import Notification from "../model/Notification.js";
import Playlist from "../model/Playlist.js";
import PromotionPost from "../model/PromotionPost.js";
import User from "../model/RegisteredUser.js";
import Report from "../model/Report.js";

const authenticate = async () => {
  try {
    return { data: "hahaha" };
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  authenticate,
};
