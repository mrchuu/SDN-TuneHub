import Artist from "../model/Artist.js";
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

const searchArtistByName = async (name) => {
  try {
    const foundArtist = await Artist.find({
      artist_name: { $regex: name, $options: "i" },
    }).select("_id artist_name");

    if (foundArtist.length == 0) {
      throw new Error("No artist found with the provided name");
    }
    return foundArtist;
  } catch (error) {
    throw new Error(error.message);
  }
};
const addSongUpload = async ({ artistId, songId, songName, songCover, isExclusive }) => {
  try {
    Artist.findByIdAndUpdate(
      artistId,
      {
        $push: {
          song_uploads: {
            songId: songId,
            song_name: songName,
            song_cover: songCover,
            is_exclusive: isExclusive
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
            withinLast24Hours: {
              $cond: {
                if: {
                  $and: [
                    {
                      $gte: [
                        "$artist_file.artist_followed", 0
                      ],
                    },
                  ],
                },
                then: 1,
                else: 0,
              },
            },
          },
        },
        {
          $sort: { "artist_file.artist_followed": -1 }
        },
        {
          $limit: 5
        },
        {
          $project: {
            _id: 1,
            artist_name: 1,
            "artist_file.introduction": 1,
            "artist_file.profile_picture": 1,
            "artist_followed_count": { $size: "$artist_file.artist_followed" }

          }
        }
      ]
    ).exec();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export default {
  findArtistByName,
  findArtistByUserId,
  searchArtistByName,
  addSongUpload,
  hotArtist
};
