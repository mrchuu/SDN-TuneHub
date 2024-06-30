import Event from "../model/Event.js";
const addEvent = async ({
  artist,
  eventName,
  eventBanner,
  discount,
  eventContent,
  eventDeadline,
  eventStart,
}) => {
  try {
    const result = await Event.create({
      artist,
      eventName,
      eventBanner,
      discount,
      eventContent,
      eventDeadline,
      eventStart,
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getArtistEvent = async (artistId) => {
  try {
    const result = await Event.find({ artist: artistId, active: true });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  addEvent,
  getArtistEvent,
};
