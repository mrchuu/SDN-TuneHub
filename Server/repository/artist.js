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
export default {
    findArtistByName
}
