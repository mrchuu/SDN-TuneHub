import Artist from "../model/Artist.js";
import song from "../model/Song.js";

const findArtistByName = async (searchInput) => {
  try {
    return await Artist.find({
      artist_name: { $regex: new RegExp(`.*${searchInput}.*`, "i") },
    }).exec();
  } catch (error) {
    throw new Error(error.message);
  }
};
const findArtistByUserId = async (userId) => {
  try {
    return await Artist.findOne({ userId: userId }).exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRisingArtist = async () => {
  try {
    return await Artist.aggregate([
      {
        $lookup: {
            from: "Users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
        },
    },
    {
        $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
        },
    },
    {
      $addFields: {
        artist_followed_count: { $size: "$followers" },
      },
    },
    {
      $sort: { artist_followed_count: -1 }
    },
    {
        $limit: 6,
    },
    {
        $project: {
            _id: 1,
            artist_name: 1,
            "user.introduction": 1,
            "user.profile_picture": 1,
            artist_followed_count: 1
        },
    },
]).exec();

  } catch (error) {
    throw new Error(error.message);
  }
};

const searchArtistByName = async (name) => {
  try {
    const foundArtist = await Artist.aggregate([
      {
          $match: {
              artist_name: { $regex: name, $options: "i" },
          },
      },
      {
          $lookup: {
              from: "Users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
          },
      },
      {
          $unwind: {
              path: "$user",
              preserveNullAndEmptyArrays: true,
          },
      },
      {
        $addFields: {
          artist_followed_count: { $size: "$followers" },
        },
      },
      {
        $sort: { artist_followed_count: -1 }
      },
      {
          $limit: 12,
      },
      {
          $project: {
              _id: 1,
              artist_name: 1,
              "user.introduction": 1,
              "user.profile_picture": 1,
              artist_followed_count: 1
          },
      },
  ]).exec();

    if (foundArtist.length == 0) {
      throw new Error("No artist found with the provided name");
    }
    return foundArtist;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  findArtistByName,
  findArtistByUserId,
  searchArtistByName,
  getRisingArtist
};
