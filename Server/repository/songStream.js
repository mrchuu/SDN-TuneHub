import SongStream from "../model/SongStream.js";
import mongoose, { Schema } from "mongoose";
import moment from "moment";
const addSongStreamm = async ({ userId, songId }) => {
  try {
    const songStream = await SongStream.create({
      song: songId,
      user: userId,
    });
    return songStream;
  } catch (error) {
    throw new Error(error.message);
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
          document: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$document" } },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
    ]);
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error);
    throw error; // Rethrow lỗi để bên ngoài có thể xử lý
  }
};
const getArtistSongStream = async (artistId, span) => {
  try {
    let spanFilter = {};
    if (span === "weekly") {
      spanFilter.createdAt = { $gte: moment().startOf("isoWeek").toDate() };
    } else if (span === "monthly") {
      spanFilter.createdAt = { $gte: moment().startOf("month").toDate() };
    }
    console.log("Span filter:", spanFilter);
    const result = await SongStream.aggregate([
      {
        $lookup: {
          from: "Song",
          localField: "song",
          foreignField: "_id",
          as: "songDetail",
        },
      },
      {
        $unwind: "$songDetail",
      },
      {
        $match: {
          $and: [
            { "songDetail.artist": new mongoose.Types.ObjectId(artistId) },
            spanFilter,
          ],
        },
      },
      {
        $count: "total",
      },
    ]);
    console.log("Aggregation result:", result);
    return result;
  } catch (error) {
    console.error("Error in getArtistSongStream:", error);
    throw new Error(error.message);
  }
};

export default {
  addSongStreamm,
  getRecentlyPlayedSongStreams,
  getArtistSongStream,
};
