import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { IoPlaySkipForwardSharp, IoPlaySkipBackSharp } from "react-icons/io5";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { IoMdVolumeHigh } from "react-icons/io";
import { Slider, duration } from "@mui/material";
import { MdOutlineQueueMusic } from "react-icons/md";
import {
  changeVolume,
  toogleIsPlaying,
  setSliderValue,
  toogleQueue,
  toogleLoop,
  updateProgress,
} from "../redux/player.js";
import { RxLoop } from "react-icons/rx";
import ReactPlayer from "react-player";
import { useEffect, useRef } from "react";
import Player from "./Player.js";
import { PiShuffleLight } from "react-icons/pi";

export default function ActionBar() {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const volumne = useSelector((state) => state.player.volume);
  const progress = useSelector((state) => state.player.progress);
  const sliderValue = useSelector((state) => state.player.sliderValue);
  const showBox = useSelector((state) => state.player.showBox);
  const loop = useSelector((state) => state.player.loop);
  const hasMounted = useRef(false);
  // useEffect(() => {
  //   console.log("loop changed: " + loop);
  // }, [loop]);
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (hasMounted.current) {
      console.log("rerendered");
    } else {
      hasMounted.current = true;
    }
  }, [hasMounted]);

  return (
    <div className="bg-light30 dark:bg-dark30 w-full h-20 fixed bottom-0 z-50 flex items-center justify-between px-4">
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
        {currentSong.song_name ? (
          <div className="ml-4">
            <h4 className="font-semibold text-md text-lightText dark:text-darkText">
              {currentSong.song_name}
            </h4>
            {currentSong.artist.artist_name ? (
              <div className="flex items-center">
                <p className="text-xs text-lightTextSecondary dark:text-darkTextSecondary">
                  {currentSong.artist.artist_name}
                </p>
                {currentSong.is_exclusive ? (
                  userInfo &&
                  userInfo?.songs_purchased?.includes(currentSong._id) ? (
                    <span className="text-white px-2 bg-sky-600/70 text-xs rounded ml-2 font-medium">
                      OWNED
                    </span>
                  ) : (
                    <span className="text-white px-2 bg-amber-500 text-xs rounded ml-2 font-medium">
                      EXCLUSIVE
                    </span>
                  )
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
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
        <div className="action flex items-center justify-between w-6/12 mx-auto pt-3 pb-1">
          <div className=" p-1 rounded">
            <PiShuffleLight
              size={23}
              className="text-lightTextSecondary dark:text-darkTextSecondary"
            />
          </div>
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
          <div
            className={`p-1 rounded ${
              loop
                ? "bg-light10 dark:bg-dark10 text-white dark:text-lightText"
                : " text-lightTextSecondary dark:text-darkTextSecondary"
            }`}
          >
            <RxLoop
              size={20}
              onClick={(e) => {
                dispatch(toogleLoop());
              }}
            />
          </div>
        </div>
        <div className="progress flex items-center w-9/12 mx-auto">
          {currentSong._id ? (
            <span className="mr-2 text-lightTextSecondary dark:text-darkTextSecondary">
              {Math.floor(progress / 60)}:{Math.floor(progress % 60)}
            </span>
          ) : (
            <></>
          )}

          <Slider
            aria-label="progress"
            value={progress}
            onChange={(e, value) => {
              // dispatch(toogleIsPlaying(false))
              dispatch(setSliderValue(value));
              // console.log(e.target.value);
            }}
            max={currentSong?.duration}
            className="text-light10"
          />
          <div>
            {currentSong.duration ? (
              <span className="ml-2 text-lightTextSecondary dark:text-darkTextSecondary">
                {Math.floor(currentSong.duration / 60)}:
                {Math.floor(currentSong.duration % 60)}
              </span>
            ) : (
              <></>
            )}
          </div>
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
        <MdOutlineQueueMusic
          size={25}
          className={`${
            showBox
              ? "text-white bg-light10 dark:bg-dark10"
              : "text-light10 dark:text-dark10"
          } mr-3 rounded-sm`}
          onClick={(e) => {
            dispatch(toogleQueue());
          }}
        />
      </div>
    </div>
  );
}
