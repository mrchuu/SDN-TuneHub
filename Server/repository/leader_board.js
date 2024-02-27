import Song from "../model/Song.js";
import SongStream from "../model/SongStream.js";
import Artist from "../model/Artist.js";

const hotestSongByDay = async () => {
    try {
        const oneDayAgo = new Date(new Date() - (24 * 30 * 60 * 60 * 1000));
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
                    $unwind: "$streamTime",
                },
                {
                    $addFields: {
                        withinLast24Hours: {
                            $cond: {
                                if: {
                                    $and: [
                                        {
                                            $gte: [
                                                "$streamTime.createdAt",
                                                new Date(
                                                    new Date() -
                                                    24 * 30 * 60 * 60 * 1000
                                                ),
                                            ],
                                        },
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
                    $group: {
                        _id: "$_id",
                        song_name: {
                            $first: "$song_name",
                        },
                        album: {
                            $first: "$album",
                        },
                        artist_name: {
                            $first: "$artist_file.artist_name",
                        },
                        cover_image: {
                            $first: "$cover_image",
                        },
                        profile_picture: {
                            $first: "$users_file.profile_picture",
                        },
                        intro_user: {
                            $first: "$users_file.introduction"
                        },
                        streamCount: {
                            $sum: "$withinLast24Hours",
                        },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        song_name: 1,
                        album: 1,
                        artist: 1,
                        artist_name: 1,
                        cover_image: 1,
                        profile_picture: 1,
                        streamCount: 1,
                        intro_user: 1,
                        cover_image: 1,
                    },
                },
            ]
        ).exec();
        return results;
    } catch (error) {
        console.log(error.message);
    }
}
export default {
    hotestSongByDay
}
