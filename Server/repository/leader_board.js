import Song from "../model/Song.js";
import SongStream from "../model/SongStream.js";
import Artist from "../model/Artist.js";

const hotestSongByDay = async () => {
    try {
        const oneMonthAgo = new Date(new Date() - (24 * 30 * 60 * 60 * 1000));
        const results = await Song.aggregate(
            [
                {
                    $lookup: {
                        from: "SongStream",
                        localField: "_id",
                        foreignField: "song",
                        as: "streamTime",
                    },
                },
                {
                    $unwind: {
                        path: "$streamTime",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $addFields: {
                        withinLast24Hours: {
                            $cond: {
                                if: {
                                    $and: [
                                        { $gte: ["$streamTime.createdAt", { oneMonthAgo }] },
                                        {
                                            $lt: [
                                                "$streamTime.createdAt",
                                                new Date(),
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
                    $lookup: {
                        from: "Artist",
                        localField: "artist",
                        foreignField: "_id",
                        as: "artist_file",
                    },
                },
                {
                    $unwind: "$artist_file",
                },
                {
                    $lookup: {
                        from: "Users",
                        localField: "artist_file.userId",
                        foreignField: "_id",
                        as: "users_file",
                    },
                },
                {
                    $unwind: "$users_file",
                },
                {
                    $lookup: {
                        from: "Album",
                        localField: "album",
                        foreignField: "_id",
                        as: "album_file",
                    },
                },
                {
                    $unwind: {
                        path: "$album_file",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        song_name: { $first: "$song_name" },
                        album: { $first: "$album" },
                        artist_name: {
                            $first: "$artist_file.artist_name",
                        },
                        cover_image: { $first: "$cover_image" },
                        profile_picture: {
                            $first: "$users_file.profile_picture",
                        },
                        album_name: {
                            $first: "$album_file.album_name",
                        },
                        intro_user: {
                            $first: "$users_file.introduction",
                        },
                        streamCount: { $sum: "$withinLast24Hours" },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        song_name: 1,
                        artist: 1,
                        artist_name: 1,
                        cover_image: 1,
                        profile_picture: 1,
                        streamCount: 1,
                        intro_user: 1,
                        album_name: 1
                    }
                }
            ]
        ).exec();
        return results;
    } catch (error) {
        console.log(error.message);
    }
}

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
    hotestSongByDay,
    hotArtist
}
