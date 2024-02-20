import SongStream from "../model/SongStream";
const addSongStreamm = async ({ userId, songId }) => {
  try {
    SongStream.create({
      song: songId,
      user: userId,
    });
  } catch (error) {
    throw new Error(error.message)
  }
};
export default {
    addSongStreamm
}