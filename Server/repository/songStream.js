import SongStream from "../model/SongStream.js";
const addSongStreamm = async ({ userId, songId }) => {
  try {
    const songStream = await SongStream.create({
      song: songId,
      user: userId,
    });
    return songStream
  } catch (error) {
    throw new Error(error.message)
  }
};
export default {
    addSongStreamm
}