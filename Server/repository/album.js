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
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getHotestAlbums = async () => {
  try {
    const result = await Album.aggregate([
      {
        $addFields: {
          totalPurchases: { $sum: "$purchases" } 
        }
      },
      {
        $sort: { totalPurchases: -1 } 
      }
    ]);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  createAlbum,
  getAlbumsOfArtists,
  getHotestAlbums
};
