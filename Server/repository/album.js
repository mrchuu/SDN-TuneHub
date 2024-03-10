import mongoose from "mongoose";
import Album from "../model/Album.js";

const createAlbum = async ({
  artist,
  album_name,
  songs,
  description,
  album_cover,
  price,
  background,
}) => {
  try {
    const result = await Album.create({
      artist,
      album_name,
      songs,
      description,
      album_cover,
      price,
      background,
    });
    return result._doc;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAlbumsOfArtists = async (artistId) => {
  try {
    const result = await Album.find(
      { artist: artistId, is_public: true },
      "createdAt _id album_cover album_name description"
    ).populate("artist","_id artist_name");
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAlbumById = async (id) => {
  try {
    // const album = await Album.findById(id).populate("artist", "artist_name").select("_id album_cover album_name songs description price is_public");
    const album = await Album.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      
      {
        $lookup: {
          from: "Artist", 
          localField: "artist",
          foreignField: "_id", 
          as: "artist" 
        }
      },
      {
        $project: {
          _id: 1,
          album_cover: 1,
          album_name: 1,
          description: 1,
          price: 1,
          is_public: 1,
          artist_name: { $arrayElemAt: ["$artist.artist_name", 0] },
          artist_id: { $arrayElemAt: ["$artist._id", 0] },
          song_count: { $size: "$songs" },
          // songs:1
        }
      }
    ]);
    return album;
  } catch (error) {
    throw new Error(error.message);
  }
}
const getAllAlbums = async()=>{
  try {
    const albums = await Album.find({}).select("_id artist album_name description album_cover");
    return albums;
  } catch (error) {
    throw new Error(error.message);
  }
}
export default {
  createAlbum,
  getAlbumsOfArtists,
  getAlbumById,
  getAllAlbums,
};
