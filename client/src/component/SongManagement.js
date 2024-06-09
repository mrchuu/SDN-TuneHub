import React, { useEffect, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import PerformRequest from "../utilities/PerformRequest.js";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { RiVipDiamondFill } from "react-icons/ri";
import {
  setCurrentSong,
  toogleIsPlaying,
  addSongToQueue,
} from "../redux/player.js";
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
function SongManagement() {
  const { OriginalRequest } = PerformRequest();
  const dispatch = useDispatch();
  const [SongList, setSong] = useState([]);
  const [date, setDate] = useState("1");
  const [check, setCheck] = useState("all");
  const [showAllSongs, setShowAllSongs] = useState(false);
  const [songInAction, setSongInAction] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [songMenuAnchor, setSongMenuAnchor] = useState(null);
  const fetchSong = async (date, check) => {
    const data = await OriginalRequest(
      `songs/leaderboard/topSong/${date}/${check}`,
      "GET"
    );
    console.log(date);
    if (data) {
      setSong(data.data);
    }
  };

  useEffect(() => {
    fetchSong(date, check);
  }, []);

  const handleFavouriteClick = async (songId) => {
    try {
      const response = await OriginalRequest(
        `songs/favourited/${songId}`,
        "POST"
      );
      if (response) {
        const updatedSongList = [...SongList];
        updatedSongList.map((song, index) => {
          if (song._id === response.result._id) {
            song.favouritedByUser = response.favourited;
          }
        });
        setSong(updatedSongList);
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  const openMenu = (e, song) => {
    setSongInAction(song);
    setMenuIsOpen(true);
    setSongMenuAnchor(e.currentTarget);
  };
  const handleChange = (value, type) => {
    if (type === "date") {
      setDate(value);
    } else if (type === "check") {
      setCheck(value);
    }
  };
  const getDateText = () => {
    switch (date) {
      case "1":
        return "Day";
      case "7":
        return "Week";
      case "30":
        return "Month";
      default:
        return "Time";
    }
  };
  return (
    <div className="w-full">
      <h4 className="text-base font-extralight dark:text-white mt-1 ml-3">
        Top Your Song on TuneHub
      </h4>
      <div className="flex flex-row">
        <button
          onClick={() => handleChange("1", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "1" ? "border-b-2 border-light10 dark:border-dark10" : ""
          }`}
        >
          <span className="cursor-pointer">Day</span>
        </button>
        <button
          onClick={() => handleChange("7", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "7" ? "border-b-2 border-light10 dark:border-dark10" : ""
          }`}
        >
          <span className="cursor-pointer">Week</span>
        </button>
        <button
          onClick={() => handleChange("30", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "30" ? "border-b-2 border-light10 dark:border-dark10" : ""
          }`}
        >
          <span className="cursor-pointer">Month</span>
        </button>
        <div className="flex-grow"></div>{" "}
        <Select
          value={check}
          onChange={(e) => handleChange(e.target.value, "check")}
          className="font-normal w-28 h-11 text-lightText dark:text-darkText rounded-md"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="true">Exclusive</MenuItem>
          <MenuItem value="false">Free</MenuItem>
        </Select>
      </div>
      <table className="w-full text-lightText dark:text-darkText mt-2">
        <thead className="font-semibold">
          <tr className="border-b border-neutral-300">
            <td className="w-1/12 pl-7">#</td>
            <td className="w-3/12">Song</td>
            <td className="w-2/12">Date</td>
            <td className="w-1/12">Album</td>
            <td className="w-1/12 ">Status</td>
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
              <td className="w-3/12 py-2">
                <div className="flex items-center">
                  <div
                    style={{ backgroundImage: `url('${song.cover_image}')` }}
                    className={`relative w-14 h-14 bg-cover bg-center flex items-center justify-center rounded-md shadow-lg shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm`}
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></div>

                    <FaPlay className="text-light10 dark:text-dark10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  </div>

                  <div className="ml-2">
                    <h4 className="font-semibold text-md flex flex-row">
                      {song.song_name ? (
                        <Link
                          to={`/songdetail/${song._id}`}
                          className="text-xs hover:underline flex items-center"
                          style={{ fontSize: "1rem", lineHeight: "1rem" }}
                          onClick={(e) => {
                            dispatch(setCurrentSong(song));
                            dispatch(toogleIsPlaying(true));
                          }}
                        >
                          {song.song_name}
                          {song.is_exclusive ? (
                            <RiVipDiamondFill className="text-yellow-500/50 ml-1" />
                          ) : null}
                        </Link>
                      ) : (
                        <></>
                      )}
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
                          {song.artist.artist_name}
                        </Link>
                      ) : (
                        <></>
                      )}
                      {song.participated_artists &&
                        song.participated_artists.length > 0 && (
                          <>
                            {song.participated_artists.map((artist, index) => (
                              <span key={index}>{index >= 0 && ", "}</span>
                            ))}
                          </>
                        )}
                    </h6>
                  </div>
                </div>
              </td>
              <td className="w-2/12 hover:underline">
                {song.album ? (
                  <Link
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    to={"/album/" + song.album._id + "/" + song.artist._id}
                  >
                    {song.album.album_name}
                  </Link>
                ) : (
                  ""
                )}
              </td>
              <td className="w-1/12">{song.streamCount}</td>
              <td className="w-1/12">
                {Math.floor(song.duration / 60)}:{song.duration % 60}
              </td>

              <td className="w-1/12 ">
                <div className="flex items-center justify-evenly">
                  <div id={song._id}>
                    {!song.favouritedByUser ? (
                      <FaRegHeart
                        className="text-light10 dark:text-dark10 mt-1"
                        size={18}
                        onClick={(e) => {
                          handleFavouriteClick(song._id);
                          e.stopPropagation();
                        }}
                      />
                    ) : (
                      <BsHeartFill
                        className="text-light10 dark:text-dark10 mt-1"
                        size={18}
                        onClick={(e) => {
                          handleFavouriteClick(song._id);
                          e.stopPropagation();
                        }}
                      />
                    )}
                  </div>
                  <IoEllipsisHorizontal
                    onClick={(e) => {
                      e.stopPropagation();
                      openMenu(e, song);
                    }}
                  />
                </div>
              </td>
            </tr>
          )).slice(0, showAllSongs ? SongList.length : 5)}
        </tbody>
      </table>
    </div>
  );
}

export default SongManagement;
