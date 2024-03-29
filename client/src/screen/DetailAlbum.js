import React, { useEffect, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import { FaPlay } from "react-icons/fa";
import "../style/detailalbum.css"
import {
    setCurrentSong,
    toogleIsPlaying,
    addSongToQueue,
    setSongQueue,
    setQueueIndex,
} from "../redux/player.js";

import { Link, useParams } from "react-router-dom";
import SongList from "../component/SongList.js";
import PerformRequest from "../utilities/PerformRequest.js";
import AlbumList from "../component/AlbumsList.js";
import ListAlbums from "../component/ListAlbums.js";
import { useDispatch, useSelector } from "react-redux";
const DetailAlbum = () => {
    const { OriginalRequest } = PerformRequest();
    const dispatch = useDispatch();
    const { id, artistId } = useParams();
    const [album, setAlbum] = useState({});
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
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
    const fetchGetSongByAlbum =  async () => {
        
        const data = await OriginalRequest(`songs/getSongByAlbum/${id}`, "GET");
        if (data) {
            setSongs(data.data);
        }
    }
    useEffect(() => {
         fetchAlbum();
         fetchAlbumOfArtist();
         fetchGetSongByAlbum();
    }
        , [id]);
        // console.log(songs);
    // const filterAlbums = albums.filter(a => a._id !== album._id);
    return (
        <DefaultTemplate>
            <div className="w-full min-h-screen p-5">
                <div className="detail-contain">
                    <div className="detail-left-ablum">
                        <div className="cont ml-auto mr-auto w-10/12">
                            <h1 className="text-lg overflow-hidden line-clamp-1 font-semibold dark:text-darkText">
                                {album.album_name}
                            </h1>
                            <img className="object-cover object-center m-auto" src={album.album_cover} />
                            <h2 className="text-lg font-normal text-center dark:text-darkText">{album.artist_name}</h2>
                            <p className="font-normal text-center dark:text-darkText">{album.song_count} Songs | {album.price}$</p>
                            <div className="flex justify-between mt-1 text-light60">
                                <button onClick={()=> {dispatch(setSongQueue(songs));}} className="active:scale-75 dark:bg-dark10 text-sm rounded-xl w-36 flex items-center justify-center bg-light10 py-1 px-2"><FaPlay />Play All</button>
                                <button className="dark:bg-dark10 text-sm rounded-xl w-36 bg-light10 py-1 px-2">Purchase</button>
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
                        
                        <ListAlbums url={`album/getAlbumsOfArtist/${artistId}`} idAlbum={id}/>
                        {/* <ListAlbums/> */}
                    </div>
                </div>
            </div>
        </DefaultTemplate>
    );
}

export default DetailAlbum;