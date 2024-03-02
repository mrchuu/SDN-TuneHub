import React, { useEffect, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import PerformRequest from "../utilities/PerformRequest.js";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import "../style/leaderboard.css"
import {
    setCurrentSong,
    toogleIsPlaying,
    addSongToQueue,
} from "../redux/player.js";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MdLibraryMusic, MdOutlineQueueMusic } from "react-icons/md";
export default function LeaderBoard() {
    const { OriginalRequest } = PerformRequest();
    const [SongList, setSong] = useState([]);
    const [ArtistList, setArtist] = useState([]);
    const [songMenuAnchor, setSongMenuAnchor] = useState(null);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [songInAction, setSongInAction] = useState(null);
    const dispatch = useDispatch();
    const [showAllSongs, setShowAllSongs] = useState(false);
    const [showAllArtists, setShowAllArtists] = useState(false);
    let intervalId;

    const closeMenu = (e, song) => {
        setMenuIsOpen(false);
        setSongMenuAnchor(null);
    };
    const openMenu = (e, song) => {
        setSongInAction(song);
        setMenuIsOpen(true);
        setSongMenuAnchor(e.currentTarget);
    };

    const fetchSong = async () => {
        const data = await OriginalRequest("songs/leaderboard/topSong/1m", "GET");
        if (data) {
            setSong(data);
        }
    };
    const fetchArtist = async () => {
        const data = await OriginalRequest("artists/leaderboard/topArtist", "GET");
        if (data) {
            setArtist(data);
        }
    };
    useEffect(() => {
        fetchSong();
        fetchArtist();
        return () => clearInterval(intervalId);
    }, []);

    return (
        <DefaultTemplate>
            <div className="w-full min-h-screen items-center justify-center px-10">
                <h1 className="text-4xl font-bold mb-8 dark:text-white ml-4">
                    LeaderBoard
                </h1>
                <h2 className="text-2xl font-bold mb-8 dark:text-white m-4">
                    Top Song in month
                </h2>
                <table className="w-full text-lightText dark:text-darkText">
                    <thead className="font-semibold">
                        <tr className="border-b border-neutral-300">
                            <td className="w-1/12 text-center">#</td>
                            <td className="w-4/12">Song</td>
                            <td className="w-2/12">Album</td>
                            <td className="w-1/12 ">Play</td>
                            <td className="w-1/12">Time</td>
                            <td className="w-2/12">Action</td>
                        </tr>
                    </thead>
                    <tbody className="text-lightTextSecondary dark:text-darkTextSecondary hover:po">
                        {SongList.map((song, index) => (
                            <tr
                                className="border-b border-neutral-300  hover:bg-light30 dark:hover:bg-dark30 cursor-pointer group"
                                key={song._id}
                                onClick={(e) => {
                                    dispatch(setCurrentSong(song));
                                    dispatch(toogleIsPlaying(true));
                                }}
                            >
                                <td className="w-1/12 text-center">{index + 1}</td>
                                <td className="w-4/12 py-2">
                                    <div className="flex items-center">
                                        <div
                                            style={{ backgroundImage: `url('${song.cover_image}')` }}
                                            className={`relative w-14 h-14 bg-cover bg-center flex items-center justify-center rounded-md shadow-lg shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm`}
                                        >
                                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></div>

                                            <FaPlay className="text-light10 dark:text-dark10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                        </div>

                                        <div className="ml-2">
                                            <h4 className="font-semibold text-md">
                                                {song.song_name}
                                            </h4>
                                            <h6 className=" text-xs">
                                                {song.artist_name}
                                            </h6>
                                        </div>
                                    </div>
                                </td>
                                <td className="w-4/12">
                                    {song.album_name ? song.album_name : ""}
                                </td>
                                <td className="w-1/12">{song.streamCount}</td>
                                <td className="w-1/12">{Math.floor(song.duration / 60)}:{song.duration % 60}</td>
                                <td className="w-1/12">
                                    <IoEllipsisHorizontal onClick={(e) => {
                                        e.stopPropagation();
                                        openMenu(e, song);
                                    }} />
                                </td>
                            </tr>
                        )).slice(0, showAllSongs ? SongList.length : 5)}
                    </tbody>
                </table>
                <div className="text-center mt-4">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowAllSongs(!showAllSongs);
                        }}
                        className=" border border-neutral-300 rounded-full px-4 py-2 text-lightText dark:text-darkText hover:bg-light10 dark:hover:bg-dark10"
                    >
                        {showAllSongs ? "Ẩn đi" : "Xem thêm"}
                    </a>
                </div>
                <Menu
                    open={menuIsOpen}
                    anchorEl={songMenuAnchor}
                    onClose={closeMenu}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                    autoFocus={false}
                >
                    <MenuItem>
                        <ListItemIcon>
                            <FaRegHeart
                                className="text-light10 dark:text-dark10 mt-1"
                                size={18}
                            />
                            <ListItemText>&nbsp;Add To Favorite</ListItemText>
                        </ListItemIcon>
                    </MenuItem>
                    <MenuItem
                        className="flex items-center"
                        onClick={(e) => {
                            console.log(songInAction);
                            dispatch(addSongToQueue(songInAction));
                            closeMenu(e);
                        }}
                    >
                        <ListItemIcon>
                            <MdOutlineQueueMusic
                                size={22}
                                className="text-light10 dark:text-dark10 mr-3"
                            />
                            <ListItemText className="text-right">Queue Song</ListItemText>
                        </ListItemIcon>
                    </MenuItem>
                    <MenuItem className="flex items-center">
                        <ListItemIcon>
                            <MdLibraryMusic
                                size={20}
                                className="text-light10 dark:text-dark10 mr-3"
                            />
                            <ListItemText className="text-right">Add To Playlist</ListItemText>
                        </ListItemIcon>
                    </MenuItem>
                </Menu>
                <div className="w-full pt-8">
                    <div className="mx-auto">
                        <h2 className="text-2xl font-bold mb-8 dark:text-white ml-4">
                            Artist
                        </h2>
                    </div>
                    <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary">
                        {ArtistList.slice(0, showAllArtists ? ArtistList.length : 5).map((artist, index) => (
                            <div className="card p-4 ml-4 mr-5 border rounded-md bg-light30 dark:bg-dark30 relative shadow-md shadow-neutral-400 dark:shadow-blue-500/50 dark:shadow-md dark:border-none mb-8">
                                <img
                                    src={artist.artist_file.profile_picture}
                                    className="rounded-full w-40 h-40 object-cover object-center"
                                />
                                <h3 className="text-lg font-semibold dark:text-white m-2">
                                    {artist.artist_name}
                                </h3>
                                {artist.artist_file.introduction ? (
                                    <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                                        {artist.artist_file.introduction}
                                    </p>
                                ) : (
                                    <p className="text-md text-light30 dark:text-dark30 ml-2">
                                        Null
                                    </p>
                                )}

                                <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                                    Follow: {artist.artist_followed_count}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-4">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowAllArtists(!showAllArtists);
                        }}
                        className=" border border-neutral-300 rounded-full px-4 py-2 text-lightText dark:text-darkText hover:bg-light10 dark:hover:bg-dark10"
                    >
                        {showAllArtists ? "Ẩn đi" : "Xem thêm"}
                    </a>
                </div>
                <div className="w-full pt-8">
                    <div className="mx-auto">
                        <h2 className="text-2xl font-bold mb-8 dark:text-white ml-4">
                            Album
                        </h2>
                    </div>
                    <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary">
                        {ArtistList.map((artist, index) => (
                            <div className="card p-4 ml-4 mr-5 border rounded-md bg-light30 dark:bg-dark30 relative shadow-md shadow-neutral-400 dark:shadow-blue-500/50 dark:shadow-md dark:border-none mb-8">
                                <img
                                    src={artist.artist_file.profile_picture}
                                    className="rounded-md w-40 h-40 object-cover object-center"
                                />
                                <h3 className="text-lg font-semibold dark:text-white m-2">
                                    {artist.artist_name}
                                </h3>
                                {artist.artist_file.introduction ? (
                                    <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                                        {artist.artist_file.introduction}
                                    </p>
                                ) : (
                                    <p className="text-md text-light30 dark:text-dark30 ml-2">
                                        Null
                                    </p>
                                )}
                                <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                                    Follow: {artist.artist_followed_count}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-5"></div>
        </DefaultTemplate>
    );
}
