import React, { useEffect, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";

import PerformRequest from "../utilities/PerformRequest";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import {
    setCurrentSong,
    toogleIsPlaying,
    addSongToQueue,
} from "../redux/player.js";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MdLibraryMusic, MdOutlineQueueMusic } from "react-icons/md";
export default function LeaderBoard() {
    const [SongList, setSong] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/leaderboard')
            .then((resp) => resp.json())
            .then((data) => {
                setSong(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <DefaultTemplate>
            <div className="w-full min-h-screen items-center justify-center px-10">
                <h1 className="text-4xl font-bold mb-8 dark:text-white ml-4">
                    LeaderBoard
                </h1>
                <h2 className="text-2xl font-bold mb-8 dark:text-white m-10">Song</h2>
                <table className="w-full text-lightText dark:text-darkText">
                    <thead className="font-semibold">
                        <tr className="border-b border-neutral-300">
                            <td className="w-1/12 text-center">#</td>
                            <td className="w-4/12">Song</td>
                            <td className="w-2/12">Album</td>
                            <td className="w-1/12">Artist</td>
                            <td className="w-1/12 ">Play</td>
                            <td className="w-2/12">Action</td>
                        </tr>
                    </thead>
                    <tbody className="text-lightTextSecondary dark:text-darkTextSecondary hover:po">
                        {SongList.map((song, index) => (
                            <tr
                                className="border-b border-neutral-300 hover:bg-light30 dark:hover:bg-dark30 cursor-pointer group"
                                key={song._id}
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
                                            <h4 className="font-semibold text-md">{song.song_name}</h4>

                                        </div>
                                    </div>
                                </td>
                                {/* <td className="hidden md:table-cell md:w-5/12">
                                    {song.album ? "album" : ""}
                                </td> */}
                                <td className="w-4/12">
                                    {song.album ? song.album : "null"}
                                </td>
                                <td className="w-1/12">
                                    {song.artist_name}
                                </td>
                                <td className="w-1/12">
                                    {song.streamCount}
                                </td>
                                <td className="w-1/12">
                                    <IoEllipsisHorizontal
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Menu
                // open={menuIsOpen}
                // anchorEl={songMenuAnchor}
                // onClose={closeMenu}
                // MenuListProps={{
                //     "aria-labelledby": "basic-button",
                // }}
                // autoFocus={false}
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
                    // className="flex items-center"
                    // onClick={(e) => {
                    //     console.log(songInAction);
                    //     dispatch(addSongToQueue(songInAction));
                    //     closeMenu(e)
                    // }}
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
                <div className="w-full pt-8 ">
                    <div className="container mx-auto">
                        <h2 className="text-2xl font-bold mb-8 dark:text-white ml-4">Artist</h2>
                    </div>
                    <div className="container mx-auto flex flex-wrap items-center">
                        {SongList.map((song, index) => (
                            <div className="card p-4 ml-4 mr-5 border rounded-md bg-light30 dark:bg-dark30 relative shadow-lg shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm">
                                <img
                                    src={song.profile_picture}
                                    className="rounded-full w-40 h-40 object-cover object-center"
                                />
                                <h3 className="text-lg font-bold dark:text-white m-2">
                                    {song.artist_name}
                                </h3>
                                <p className="text-xs dark:text-white m-2">{song.intro_user}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full pt-8 ">
                    <div className="container mx-auto">
                        <h2 className="text-2xl font-bold mb-8 dark:text-white ml-4">Album</h2>
                    </div>
                    <div className="container mx-auto flex flex-wrap items-center">
                        {SongList.map((song, index) => (
                            <div className="card p-4 ml-4 mr-5 border rounded-md bg-light30 dark:bg-dark30 relative shadow-lg shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm">
                                <img
                                    src={song.profile_picture}
                                    className="rounded-md w-40 h-40 object-cover object-center"
                                />
                                <h3 className="text-lg font-bold dark:text-white m-2">
                                    {song.artist_name}
                                </h3>
                                <p className="text-xs dark:text-white m-2">{song.intro_user}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DefaultTemplate>
    );
}
