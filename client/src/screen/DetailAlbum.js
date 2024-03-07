import React, { useEffect, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import "../style/detailalbum.css"
import {
    setCurrentSong,
    toogleIsPlaying,
    addSongToQueue,
} from "../redux/player.js";

import { Link, useParams } from "react-router-dom";
import SongList from "../component/SongList.js";
import PerformRequest from "../utilities/PerformRequest.js";
import AlbumList from "../component/AlbumsList.js";
import ListAlbums from "../component/ListAlbums.js";
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
                        {/* <ListAlbums url={`album/getAlbumsOfArtist/${artistId}`} idAlbum={id}/> */}
                        <ListAlbums/>
                    </div>
                </div>
            </div>
        </DefaultTemplate>
    );
}

export default DetailAlbum;