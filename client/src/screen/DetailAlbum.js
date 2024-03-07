import React, { useEffect, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import "../style/detailalbum.css"
import {
    setCurrentSong,
    toogleIsPlaying,
    addSongToQueue,
} from "../redux/player.js";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MdLibraryMusic, MdOutlineQueueMusic } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import SongList from "../component/SongList.js";
import PerformRequest from "../utilities/PerformRequest.js";
import AlbumList from "../component/AlbumsList.js";
const DetailAlbum = () => {
    const { OriginalRequest } = PerformRequest();
    const { id, artistId } = useParams();
    const [album, setAlbum] = useState({});
    const [albums, setAlbums] = useState([]);
    const fetchAlbum = async () => {
        const data = await OriginalRequest(`album/getAlbumById/${id}`, "GET");
        if (data) {
            setAlbum(data.data);
        }
    }
    const fetchAlbumOfArtist = async () => {
        console.log(album);
        const data = await OriginalRequest(`album/getAlbumsOfArtist/${artistId}`, "GET");
        if (data) {
            setAlbums(data.data);
        }
    };
    useEffect(() => {
        fetchAlbum();
        console.log("Albums: " + albums.length);
        fetchAlbumOfArtist();
    }
        , [id]);
    const filterAlbums = albums.filter(a => a._id !== album._id);
    return (
        <DefaultTemplate>
            <div className="w-full min-h-screen p-5">
                <div className="detail-contain">
                    <div className="detail-left-ablum">
                        <div className="cont ml-auto mr-auto w-10/12">
                            <h1 className="text-2xl font-semibold dark:text-darkText">
                                {album.album_name}
                            </h1>
                            <img src={album.album_cover} />
                            <h1 className="text-lg font-normal text-center dark:text-darkText">{album.artist_name}</h1>
                            <p className="font-normal text-center dark:text-darkText">{album.song_count} Songs</p>
                            <div className="flex justify-between mt-1 text-light60">
                                <button className="dark:bg-dark10 text-sm rounded-xl w-36 flex items-center justify-center bg-light10 py-1 px-2"><FaPlay />Play All</button>
                                <button className="dark:bg-dark10 text-sm rounded-xl w-36 bg-light10 py-1 px-2">Purchase {album.price}$</button>
                            </div>
                        </div>
                    </div>
                    <div className="detail-right-songs">
                        <SongList url={`songs/getSongByAlbum/${id}`} />
                        {/* <SongList /> */}
                    </div>
                </div>
                <div className="more-album-contain">
                    <div className="w-full p-7">
                        <div className="mx-auto">
                            <h2 className="text-2xl font-semibold mb-8 dark:text-white ml-4">
                                More From {album.artist_name}
                            </h2>
                        </div>
                        <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary">
                            {filterAlbums.map((alb, index) => (
                                <Link key={index} to={`/album/${alb._id}/${artistId}`}>
                                    <div className="card p-4 ml-4 mr-5 border rounded-md bg-light30 dark:bg-dark30 relative shadow-md shadow-neutral-400 dark:shadow-blue-500/50 dark:shadow-md dark:border-none mb-8">
                                        <img
                                            src={alb.album_cover}
                                            className="ml-1 rounded-md w-40 h-40 object-cover object-center"
                                        />
                                        <h3 id="h3-card" className="text-lg font-semibold dark:text-white m-2 w-40 overflow-hidden line-clamp-1">
                                            {alb.album_name}
                                        </h3>
                                        {alb.description ? (
                                            <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2 w-40 h-16 overflow-hidden line-clamp-2">
                                                {alb.description}
                                            </p>
                                        ) : (
                                            <p className="text-md text-light30 dark:text-dark30 ml-2">
                                                Null
                                            </p>
                                        )}

                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultTemplate>
    );
}

export default DetailAlbum;