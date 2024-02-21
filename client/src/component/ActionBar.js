import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { IoPlaySkipForwardSharp, IoPlaySkipBackSharp } from "react-icons/io5";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { IoMdVolumeHigh } from "react-icons/io";
import { Slider } from "@mui/material";
import { AiFillAppstore } from "react-icons/ai";
import {
  changeVolume,
  toogleIsPlaying,
  updateProgress,
} from "../redux/player.js";
import ReactPlayer from "react-player";
import { useEffect } from "react";
import Player from "./Player.js";
export default function ActionBar() {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const volumne = useSelector((state) => state.player.volume);
  const progress = useSelector((state) => state.player.progress);
  useEffect(() => {
    console.log("song changed");
  }, [currentSong._id]);
  return (
    <div className="bg-light30 dark:bg-dark30 w-full h-20 fixed bottom-0 z-50 flex items-center justify-between">
      <div className="songInfo h-full px-4 flex items-center w-3/12 ">
        {currentSong.cover_image ? (
          <img
            alt="song_cover_image"
            className="w-16 h-16 object-center object-cover rounded-md "
            src={currentSong.cover_image}
          />
        ) : (
          <div className="w-16 h-16 rounded-md bg-zinc-400"></div>
        )}
        {currentSong.artist && currentSong.song_name ? (
          <div className="ml-2">
            <h4 className="font-semibold text-md text-lightText dark:text-darkText">
              {currentSong.song_name}
            </h4>
            <p className="text-xs text-lightTextSecondary dark:text-darkTextSecondary">
              {currentSong.artist.artist_name}
            </p>
            <FaRegHeart
              className="text-light10 dark:text-dark10 mt-1"
              size={20}
            />
          </div>
        ) : (
          <div className="ml-2"></div>
        )}
      </div>
      <div className="playerAction h-full px-4 flex-col w-6/12">
        <Player />
        <div className="action flex items-center justify-between w-3/12 mx-auto pt-3 pb-1">
          <IoPlaySkipBackSharp
            className="text-light10 dark:text-dark10"
            size={30}
          />
          {isPlaying ? (
            <FaPauseCircle
              className="text-light10 dark:text-dark10 cursor-pointer"
              size={35}
              onClick={(e) => {
                dispatch(toogleIsPlaying(false));
              }}
            />
          ) : (
            <FaPlayCircle
              className="text-light10 dark:text-dark10 cursor-pointer"
              size={35}
              onClick={(e) => {
                dispatch(toogleIsPlaying(true));
              }}
            />
          )}
          <IoPlaySkipForwardSharp
            className="text-light10 dark:text-dark10"
            size={30}
          />
        </div>
        <div className="progress w-9/12 mx-auto">
          <Slider
            aria-label="progress"
            value={(progress * 100) / currentSong.duration}
            key={progress}
            onChange={(e) => {
              dispatch(
                updateProgress((e.target.value * currentSong.duration) / 100)
              );
            }}
            className="text-light10"
          />
        </div>
      </div>
      <div className="userAction h-full px-4 flex items-center w-3/12 justify-end">
        <div className="flex items-center w-5/12 mr-5">
          <IoMdVolumeHigh
            className="text-light10 dark:text-dark10 mr-3"
            size={25}
          />
          <Slider
            aria-label="Volume"
            value={volumne}
            onChange={(e) => {
              dispatch(changeVolume(e.target.value));
            }}
            className="text-light10"
          />
        </div>
        <AiFillAppstore
          size={25}
          className="text-light10 dark:text-dark10 mr-3"
        />
      </div>
    </div>
  );
}
