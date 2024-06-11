import mongoose from "mongoose";
import Transaction from "../model/Transaction.js";
import moment from "moment";
import artist from "./artist.js";
const addTransaction = async ({ user, seller, amount, type, goodsId }) => {
  try {
    const result = await Transaction.create({
      user,
      seller,
      transactionType: type,
      amount,
      goodsId,
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getSaleOfArtist = async (artistId, span) => {
  try {
    let filter = {};
    if (span === "weekly") {
      filter.createdAt = { $gte: moment().startOf("isoWeek").toDate() };
    } else if (span === "monthly") {
      filter.createdAt = { $gte: moment().startOf("month").toDate() };
    }
    filter.seller = artistId;
    const transactions = await Transaction.find(filter);
    const result = transactions.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getRevenueTrend = async (artist, span) => {
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
    const result = await Transaction.aggregate([
      {
        $match: {
          $and: [
            filter,
            {
              seller: new mongoose.Types.ObjectId(artist._id),
            },
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
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalAmount: 1,
        },
      },
    ]);
    // console.log(result);
    const revenueMap = result.reduce((acc, { date, totalAmount }) => {
      acc[date] = totalAmount;
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
const getArtistRevenueRatio = async (artist, span) => {
  try {
    let filter = {};
    // let daysArray = [];
    // let format = "%Y-%m-%d";
    if (span === "weekly") {
      const startOfWeek = moment().startOf("isoWeek").toDate();
      const currentDate = moment().endOf("day").toDate();
      filter.createdAt = {
        $gte: startOfWeek,
        $lt: currentDate,
      };
    } else if (span === "monthly") {
      const startOfMonth = moment().startOf("month").toDate();
      const currentDate = moment().endOf("day").toDate();
      filter.createdAt = {
        $gte: startOfMonth,
        $lt: currentDate,
      };
    }
    const result = await Transaction.aggregate([
      {
        $match: {
          $and: [
            {
              seller: new mongoose.Types.ObjectId(artist._id),
            },
            filter,
          ],
        },
      },
      {
        $group: {
          _id: "$transactionType",
          count: {
            $sum: 1,
          },
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1,
          totalRevenue: 1,
        },
      },
    ]);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  addTransaction,
  getSaleOfArtist,
  getRevenueTrend,
  getArtistRevenueRatio,
};
