import mongoose from "mongoose";
import User from "../model/RegisteredUser.js";
import Artist from "../model/Artist.js";
import Playlist from "../model/Playlist.js";
import moment from 'moment'
import Song from "../model/Song.js";
const findById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};
const updateProfile = async (
    id,
    { firstName, lastName, introduction, profilePicture }
) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                first_name: firstName,
                last_name: lastName,
                introduction: introduction,
                profile_picture: profilePicture,
            },
            { new: true }
        );
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};
const addSongPurchased = async (userId, songId) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { songs_purchased: new mongoose.Types.ObjectId(songId) },
            },
            { new: true }
        );
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

const followArtist = async ({ artistId, userId }) => {
    try {
        const user = await User.findById(userId);
        const isFollowed = user.artist_followed.includes(artistId);
        let registerUser;
        if (!isFollowed) {
            registerUser = await User.findByIdAndUpdate(userId, {
                $push: { artist_followed: new mongoose.Types.ObjectId(artistId) },
            });
            await Artist.findByIdAndUpdate(artistId, {
                $push: { followers: new mongoose.Types.ObjectId(userId) },
            });
        } else {
            registerUser = await User.findByIdAndUpdate(userId, {
                $pull: { artist_followed: artistId },
            });
            await Artist.findByIdAndUpdate(artistId, {
                $pull: { followers: userId },
            });
        }
        return registerUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

const checkArtistFollowed = async ({ artistId, userId }) => {
    try {
        const registerUser = await User.findById(userId);
        if (registerUser) {
            const isFollowed = registerUser.artist_followed.includes(artistId);
            return isFollowed;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
const getListArtistFollowed = async (id) => {
    try {
        const listArtistFollowed = User.findOne({ _id: id }).select("artist_followed");
        return listArtistFollowed;
    } catch (error) {
        throw new Error(error.message);
    }

}
async function getInforArtistFollowed(artistFollowed) {
    try {
        const artists = await Artist.find({ _id: { $in: artistFollowed } }).populate({
            path: 'userId',
            select: 'introduction profile_picture'
        }).select('_id artist_name');
        const formattedArtists = artists.map(artist => ({
            _id: artist._id,
            artist_name: artist.artist_name,
            userIdOfArtist: artist.userId._id,
            introduction: artist.userId.introduction,
            profile_picture: artist.userId.profile_picture
        }));
        return formattedArtists;
    } catch (error) {
        throw new Error(error.message);
    }
};
const getListPlayList = async (userId) => {
    try {
        const playlists = await Playlist.find({ creator: userId }).select("-songs").exec();
        const formattedPlaylists = playlists.map(playlist => ({
            ...playlist.toObject(),
            // createdAt: moment(playlist.createdAt).format('DD/MM/yyyy hh:mm:ss A')
            createdAt: moment(playlist.createdAt).format('DD/MM/yyyy')
        }));

        return formattedPlaylists;
    } catch (error) {
        throw new Error(error.message);
    }
}
const getListFavouritedSong = async (userId) => {
    try {
        const favouritedSongs = await Song.find({ favourited: userId }).select("_id song_name genre file_name cover_image artist duration");
        return favouritedSongs;
    } catch (error) {
        throw new Error(error.message);
    }
}


export default {
    findById,
    updateProfile,
    addSongPurchased,
    followArtist,
    checkArtistFollowed,
    getListArtistFollowed,
    getInforArtistFollowed,
    getListPlayList,
    getListFavouritedSong,
};
