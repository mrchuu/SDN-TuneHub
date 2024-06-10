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
    return result;
  } catch (error) {
    console.error("Error in getArtistSongStream:", error);
    throw new Error(error.message);
  }
};
const getArtistSongStreamTrend = async (artist, span) => {

  try {
    let filter = {};
    let daysArray = [];
    let format = "%Y-%m-%d";
    if (span === "weekly") {
      const startOfWeek = moment().startOf("isoWeek").toDate();
      const currentDate = moment().endOf("day").toDate();
      filter.createdAt = {
        $gte: startOfWeek,
        $lt: currentDate,
      };
      const dayDiff = moment(currentDate).diff(startOfWeek, "days");
      daysArray = Array.from({ length: dayDiff + 1 }, (_, i) => {
        const date = moment(startOfWeek).add(i, "days").format("YYYY-MM-DD");
        return date;
      });
    } else if (span === "monthly") {
      const startOfMonth = moment().startOf("month").toDate();
      const currentDate = moment().endOf("day").toDate();
      filter.createdAt = {
        $gte: startOfMonth,
        $lt: currentDate,
      };
      const dayDiff = moment(currentDate).diff(startOfMonth, "days");
      daysArray = Array.from({ length: dayDiff + 1 }, (_, i) => {
        const date = moment(startOfMonth).add(i, "days").format("YYYY-MM-DD");
        return date;
      });
    } else if (span === "allTime") {
      const startOfCareer = moment(artist.createdAt).toDate();
      const currentDate = moment().endOf("day").toDate();
      const monthDiff = moment(currentDate).diff(startOfCareer, "months") + 1;
      console.log(monthDiff);
      daysArray = Array.from({ length: monthDiff + 1 }, (_, i) => {
        const month = moment(startOfCareer).add(i, "months").format("YYYY-MM");
        return month;
      });
      format = "%Y-%m";
    }
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
            {
              "songDetail.artist": new mongoose.Types.ObjectId(artist._id),
            },
            filter
          ],
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: format,
              date: "$createdAt",
            },
          },
          streamCount: {
            $sum: 1,
          },
          songDetail: {
            $first: "$songDetail",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          streamCount: 1,
        },
      },
    ]);
    const revenueMap = result.reduce((acc, { date, streamCount }) => {
      acc[date] = streamCount;
      return acc;
    }, {});
    const finalResult = daysArray.map((day) => ({
      date: day,
      totalAmount: revenueMap[day] || 0,
    }));
    // console.log(finalResult);
    return finalResult;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  addSongStreamm,
  getRecentlyPlayedSongStreams,
  getArtistSongStream,
  getArtistSongStreamTrend,
};
