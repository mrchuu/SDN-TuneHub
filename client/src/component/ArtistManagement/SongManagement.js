import React, { useEffect, useState } from "react";
import DefaultTemplate from "../../template/DefaultTemplate.js";
import PerformRequest from "../../utilities/PerformRequest.js";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { RiVipDiamondFill } from "react-icons/ri";

import { Link } from "react-router-dom";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import Modal from "react-modal";

function SongManagement() {
  const { OriginalRequest } = PerformRequest();
  const dispatch = useDispatch();
  const [SongList, setSong] = useState([]);
  const [date, setDate] = useState("alltime");
  const [sort, setSort] = useState("streamCount");
  const fetchSong = async (date, sort) => {
    const data = await OriginalRequest(
      `songs/filterSongByArtist/${date}/${sort}`,
      "GET"
    );
    if (data) {
      setSong(data.data);
    }
  };

  useEffect(() => {
    fetchSong(date, sort);
  }, [date, sort]);
  const handleChange = (value, type) => {
    if (type === "sort") {
      setSort(value);
    } else if (type === "date") {
      setDate(value);
    }
  };

  const [songId, setSongId] = useState("");

  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const openModal = (id) => {
    setSongId(id);
    setCurrentSong(id);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentSong(null);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    handleFavouriteClick(songId);
    console.log("Song status changed:", currentSong);
    closeModal();
  };

  const handleFavouriteClick = async (songId) => {
    try {
      await OriginalRequest(`songs/disableEnableSong`, "POST", { songId });
      setSong((prevSongList) =>
        prevSongList.map((song) =>
          song._id === songId ? { ...song, is_public: !song.is_public } : song
        )
      );
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      border: "none",
    },
  };

  return (
    <div className="w-full">
      <h4 className="text-base font-extralight dark:text-white mt-1 ml-3">
        Top Your Song on TuneHub
      </h4>
      <div className="flex flex-row">
        <button
          onClick={() => handleChange("1month", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "1month"
              ? "border-b-2 border-light10 dark:border-dark10"
              : ""
          }`}
        >
          <span className="cursor-pointer">Last month</span>
        </button>
        <button
          onClick={() => handleChange("3month", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "3month"
              ? "border-b-2 border-light10 dark:border-dark10"
              : ""
          }`}
        >
          <span className="cursor-pointer">Last 3 months</span>
        </button>
        <button
          onClick={() => handleChange("6month", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "6month"
              ? "border-b-2 border-light10 dark:border-dark10"
              : ""
          }`}
        >
          <span className="cursor-pointer">Last 6 months</span>
        </button>
        <button
          onClick={() => handleChange("alltime", "date")}
          className={`px-3 py-2 font-semibold text-lightText dark:text-darkText m-1 ${
            date === "alltime"
              ? "border-b-2 border-light10 dark:border-dark10"
              : ""
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
            <td className="w-2/12">Song</td>
            <td className="w-1/12 pl-3">Date</td>
            <td className="w-2/12 pl-3">Album</td>
            <td className="w-1/12 pr-3">Feature</td>
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
              // onClick={(e) => {
              //   dispatch(setCurrentSong(song));
              //   dispatch(toogleIsPlaying(true));
              // }}
            >
              <td className="w-1/12 pl-7">{index + 1}</td>
              <td className="w-3/12 py-1">
                <div className="flex items-center">
                  <div
                    style={{ backgroundImage: `url('${song.cover_image}')` }}
                    className={`relative w-12 h-12 bg-cover bg-center flex items-center justify-center rounded-md shadow-lg shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm`}
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
                    </h6>
                  </div>
                </div>
              </td>
              <td className="w-1/12 pl-3">{new Date(song.createdAt).toISOString().slice(0, 10)}</td>
              <td className="w-2/12 hover:underline pr-6 pl-3">
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
              <td className="w-2/12 pr-3">
                {song.participated_artists &&
                  song.participated_artists.length > 0 && (
                    <>
                      {song.participated_artists.map((artist, index) => (
                        <span key={index}>
                          {artist.artist_name}
                          {index >= 0 && index != song.participated_artists.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </>
                  )}
              </td>
              <td className="w-1/12">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(song._id);
                  }}
                  className={`px-2 py-1 rounded ${
                    song.is_public ? "bg-green-500" : "bg-red-500"
                  } text-white`}
                >
                  {song.is_public ? "Enable" : "Disable"}
                </button>
              </td>
              <td className="w-1/12">{song.streamCount}</td>
              <td className="w-1/12">{Intl.NumberFormat("de-DE").format(song.totalRevenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Confirm Action"
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
          <p className="mb-4">
            Are you sure you want to{" "}
            {currentSong?.is_public ? "Disable" : "Enable"} this song?
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleConfirm}
              className="px-4 py-1 bg-orange-500 text-white rounded mr-2 hover:bg-orange-600"
            >
              Confirm
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SongManagement;
