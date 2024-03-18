import SongStream from "../model/SongStream.js";
import mongoose, { Schema } from "mongoose";
const addSongStreamm = async ({ userId, songId }) => {
  try {
    const songStream = await SongStream.create({
      song: songId,
      user: userId,
    });
    return songStream
  } catch (error) {
    throw new Error(error.message)
  }
};

const getRecentlyPlayedSongStreams = async (currentUserId) => {
  try {
    const userId = new mongoose.Types.ObjectId(currentUserId);
    return await SongStream.aggregate([
      { $match: { user: userId } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: { user: "$user", song: "$song" },
          document: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$document" } },
      { $sort: { createdAt: -1 } },
      { $limit: 10 }
    ]);
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    throw error; // Rethrow lỗi để bên ngoài có thể xử lý
  }
};

export default {
  addSongStreamm, getRecentlyPlayedSongStreams,
}