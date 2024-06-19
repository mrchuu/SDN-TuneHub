import Artist from "../model/Artist.js";
import song from "../model/Song.js";
import User from "../model/RegisteredUser.js";
import Transaction from "../model/Transaction.js"
import { mongo } from "mongoose";
import mongoose from "mongoose";

const findArtistByName = async ({ searchInput, artistId }) => {
  try {
    return await Artist.find({
      artist_name: { $regex: new RegExp(`.*${searchInput}.*`, "i") },
      _id: { $ne: artistId },
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
    const foundArtist = await Artist.aggregate([
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
        $sort: { artist_followed_count: -1 },
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
          artist_followed_count: 1,
        },
      },
    ]).exec();

    return foundArtist;
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
        $sort: { artist_followed_count: -1 },
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
          artist_followed_count: 1,
        },
      },
    ]).exec();

    // if (foundArtist.length == 0) {
    //   throw new Error("No artist found with the provided name");
    // }
    return foundArtist;
  } catch (error) {
    throw new Error(error.message);
  }
};
const findByArtistId = async (artistId) => {
  try {
    const result = await Artist.findById(
      artistId,
      "_id artist_name followers userId"
    )
      .populate("userId", "profile_picture")
      .exec();
    return result._doc;
  } catch (error) {
    throw new Error(error.message);
  }
};
const addSongUpload = async ({
  artistId,
  songId,
  songName,
  songCover,
  isExclusive,
}) => {
  try {
    Artist.findByIdAndUpdate(
      artistId,
      {
        $push: {
          song_uploads: {
            songId: songId,
            song_name: songName,
            song_cover: songCover,
            is_exclusive: isExclusive,
          },
        },
      },
      { new: true }
    ).exec();
  } catch (error) {
    throw new Error(error.message);
  }
};

const hotArtist = async () => {
  try {
    const result = await Artist.aggregate(
      [
        {
          $lookup: {
            from: "Users",
            localField: "userId",
            foreignField: "_id",
            as: "artist_file",
          },
        },
        {
          $unwind: {
            path: "$artist_file",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            followers_count: {
              $cond: {
                if: { $isArray: "$followers" },
                then: { $size: "$followers" },
                else: 0,
              },
            },
          },
        },
        {
          $project: {
            id: 1,
            artist_name: 1,
            artist_file: {
              profile_picture:
                "$artist_file.profile_picture",
              introduction: "$artist_file.introduction",
            },
            followers_count: 1,
          },
        },
        {
          $sort: {
            followers_count: -1,
          },
        },
        { $limit: 15 },
      ]
    ).exec();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
const makeAlbum = async ({
  artistId,
  albumId,
  album_name,
  album_cover,
  price,
}) => {
  const result = await Artist.findOneAndUpdate(
    {
      _id: artistId,
    },
    {
      $push: {
        albums: {
          albumId,
          album_name,
          album_cover,
          price,
        },
      },
    },
    { new: true }
  );
  return result;
};

const topGenre = async (artistId) => {
  try {
    const result = await Artist.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(artistId),
        },
      },
      {
        $unwind: "$song_uploads",
      },
      {
        $lookup: {
          from: "SongStream",
          localField: "song_uploads.songId",
          foreignField: "song",
          as: "songStreams",
        },
      },
      {
        $lookup: {
          from: "Song",
          localField: "song_uploads.songId",
          foreignField: "_id",
          as: "songDetail",
        },
      },
      {
        $unwind: "$songDetail",
      },
      {
        $unwind: {
          path: "$followers",
        },
      },
      {
        $lookup: {
          from: "SongStream",
          localField: "followers.userId",
          foreignField: "user",
          as: "user_stream",
          pipeline: [
            {
              $lookup: {
                from: "Song",
                localField: "song",
                foreignField: "_id",
                as: "songDetail",
              },
            },
            {
              $unwind: {
                path: "$songDetail",
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $lookup: {
                from: "Genre",
                localField: "songDetail.genre",
                foreignField: "_id",
                as: "songGenre",
              },
            },
            {
              $unwind: {
                path: "$songGenre",
                preserveNullAndEmptyArrays: false,
              },
            },
            {
              $project: {
                _id: 0,
                genre: "$songGenre.name",
                hasStream: {
                  $cond: {
                    if: {
                      $gt: ["$song", null],
                    },
                    then: 1,
                    else: 0,
                  },
                },
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$user_stream",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$user_stream.genre",
          stream_count: {
            $sum: "$user_stream.hasStream",
          },
        },
      },
      {
        $project: {
          _id: 0,
          genre: "$_id",
          stream_count: 1,
        },
      },
    ]).exec();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const topStreamFavouritePurchase = async (artistId) => {
  try {
    const result = await Artist.aggregate(
      [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(artistId),
          },
        },
        {
          $unwind: "$song_uploads",
        },
        {
          $lookup: {
            from: "SongStream",
            localField: "song_uploads.songId",
            foreignField: "song",
            as: "songStreams",
          },
        },
        {
          $lookup: {
            from: "Song",
            localField: "song_uploads.songId",
            foreignField: "_id",
            as: "songDetail",
          },
        },
        {
          $unwind: "$songDetail",
        },
        {
          $project: {
            _id: 0,
            song_name: "$songDetail.song_name",
            stream_count: { $size: "$songStreams" },
            favourite_count: {
              $size: "$songDetail.favourited",
            },
            purchased_count: {
              $size: "$songDetail.purchased_user",
            },
          },
        }
      ]
    ).exec();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

const topDonateUser = async (artistId) => {
  try {
    const result = await Transaction.aggregate(
      [
        {
          $match: {
            seller: new mongoose.Types.ObjectId(artistId),
            transactionType: "donate",
          },
        },
        {
          $group: {
            _id: "$user",
            totalAmount: {
              $sum: "$amount"
            },
          },
        },
        {
          $lookup: {
            from: "Users",
            localField: "_id",
            foreignField: "_id",
            as: "user_detail",
          },
        },
        {
          $unwind: {
            path: "$user_detail",
          },
        },
        {
          $project: {
            _id: 0,
            first_name: "$user_detail.first_name",
            last_name: "$user_detail.last_name",
            totalAmount: 1,
          },
        },
        {
          $sort: {
            totalAmount: -1
          },
        },
        {
          $limit: 3
        },
      ]
    ).exec();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}


const topFollower = async (artistId) => {
  try {
    const result = await Artist.aggregate(
      [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(artistId),
          },
        },
        {
          $unwind: "$followers",
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m",
                date: "$followers.createdAt",
              },
            },
            totalFollowers: { $sum: 1 },
            createdAtArray: { $push: "$createdAt" },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            totalFollowers: 1,
            createdAt: {
              $dateToString: {
                format: "%Y-%m",
                date: {
                  $arrayElemAt: ["$createdAtArray", 0],
                },
              },
            },
          },
        },
        {
          $sort: {
            date: -1
          },
        },
      ]
    ).exec();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default {
  findArtistByName,
  findArtistByUserId,
  searchArtistByName,
  addSongUpload,
  getRisingArtist,
  hotArtist,
  makeAlbum,
  findByArtistId,
  topGenre,
  topStreamFavouritePurchase,
  topDonateUser,
  topFollower
};
