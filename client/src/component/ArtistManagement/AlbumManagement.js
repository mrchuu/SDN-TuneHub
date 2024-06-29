import React, { useEffect, useState } from "react";
import DefaultTemplate from "../../template/DefaultTemplate.js";
import PerformRequest from "../../utilities/PerformRequest.js";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { RiVipDiamondFill } from "react-icons/ri";
import {
  setCurrentSong,
  toogleIsPlaying,
} from "../../redux/player.js";
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
function AlbumManagement() {
  const { OriginalRequest } = PerformRequest();
  const dispatch = useDispatch();
  const [SongList, setSong] = useState([]);
  const [date, setDate] = useState("alltime");
  const [sort, setSort] = useState("streamCount");
  const fetchSong = async (date, sort) => {
    const data = await OriginalRequest(
      `album/filterAlbumByArtist/${date}/${sort}`,
      "GET"
    );
    if (data) {
      setSong(data.data);
    }
  };

  useEffect(() => {
    fetchSong(date, sort);
  }, [date,sort]);
  const handleChange = (value, type) => {
    if (type === "sort") {
      setSort(value);
    } else if (type === "date") {
      setDate(value);
    }
  };
  return (
    <div className="w-full">
      <h4 className="text-base font-extralight dark:text-white mt-1 ml-3">
        Top Your Album on TuneHub
      </h4>
      <div className="flex flex-row">
        <button
          onClick={() => handleChange("1month", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "1month" ? "border-b-2 border-light10 dark:border-dark10" : ""
          }`}
        >
          <span className="cursor-pointer">Last month</span>
        </button>
        <button
          onClick={() => handleChange("3month", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "3month" ? "border-b-2 border-light10 dark:border-dark10" : ""
          }`}
        >
          <span className="cursor-pointer">Last 3 months</span>
        </button>
        <button
          onClick={() => handleChange("6month", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "6month" ? "border-b-2 border-light10 dark:border-dark10" : ""
          }`}
        >
          <span className="cursor-pointer">Last 6 months</span>
        </button>
        <button
          onClick={() => handleChange("alltime", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "alltime" ? "border-b-2 border-light10 dark:border-dark10" : ""
          }`}
        >
          <span className="cursor-pointer">All Time</span>
        </button>
        <div className="flex-grow"></div>{" "}
        <Select
          value={sort}
          onChange={(e) => handleChange(e.target.value, "sort")}
          className="font-normal w-36 h-10 text-lightText dark:text-darkText rounded-md"
        >
          <MenuItem value="streamCount">Stream Counts</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="revenue">Revenue</MenuItem>
        </Select>
      </div>
      <table className="w-full text-lightText dark:text-darkText mt-2">
        <thead className="font-semibold">
          <tr className="border-b border-neutral-300">
            <td className="w-1/12 pl-7">#</td>
            <td className="w-2/12">Album name</td>
            <td className="w-2/12">Date</td>
            <td className="w-2/12">Top Song</td>
            <td className="w-1/12 ">Price</td>
            <td className="w-1/12">Play</td>
            <td className="w-1/12">Revenue</td>
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
              <td className="w-1/12 pl-7">{index + 1}</td>
              <td className="w-3/12 py-1">
                <div className="flex items-center">
                  <div
                    style={{ backgroundImage: `url('${song.album_cover}')` }}
                    className={`relative w-12 h-12 bg-cover bg-center flex items-center justify-center rounded-md shadow-lg shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm`}
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></div>

                    <FaPlay className="text-light10 dark:text-dark10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  </div>

                  <div className="ml-2">
                    <h4 className="font-semibold text-md flex flex-row">
                      {song.album_name}
                    </h4>
                    <h6 className="text-xs">
                      {song.artist ? (
                        <Link
                          to={`/artist/${song.artist._id}`}
                          className="text-xs hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {/* {song.artist.artist_name} */}
                        </Link>
                      ) : (
                        <></>
                      )}
                      {/* {song.participated_artists &&
                        song.participated_artists.length > 0 && (
                          <>
                            {song.participated_artists.map((artist, index) => (
                              <span key={index}>{index >= 0 && ", "}</span>
                            ))}
                          </>
                        )} */}
                    </h6>
                  </div>
                </div>
              </td>
              <td className="w-1/12">{song.createdAt}</td>
              <td className="w-2/12 hover:underline pr-6">
                {song.highStreamSong.song_name}
              </td>
              <td className="w-1/12">
              {song.price} 
              </td>
              <td className="w-1/12">
              {song.totalStreams} 
              </td>
              <td className="w-1/12">
              {Intl.NumberFormat("de-DE").format(song.totalRevenue)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlbumManagement;
