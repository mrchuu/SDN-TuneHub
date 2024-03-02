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
export default {
  createAlbum,
};
