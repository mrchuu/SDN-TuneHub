import Artist from "../model/Artist.js";

const searchArtistByName = async (name) => {
    try {
        const foundArtist = await Artist.find({
            artist_name: { $regex: name, $options: "i" },
        }).select("_id artist_name")

        if(foundArtist.length == 0){
            throw new Error("No artist found with the provided name")
        }
        return foundArtist;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default{
    searchArtistByName
}