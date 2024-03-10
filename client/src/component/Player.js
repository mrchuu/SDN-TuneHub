import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import {
  toogleIsPlaying,
  updateProgress,
  finishSong,
  setSliderValue,
} from "../redux/player.js";
import PerformRequest from "../utilities/PerformRequest.js";
import { Box, Fade, Modal, Typography } from "@mui/material";
import { setPurchaseSong } from "../redux/purchase.js";
import { useNavigate } from "react-router-dom";
export default function Player() {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const volume = useSelector((state) => state.player.volume);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const loop = useSelector((state) => state.player.loop);
  const playerRef = useRef(null);
  const sliderValue = useSelector((state) => state.player.sliderValue);
  const { OriginalRequest } = PerformRequest();
  const [apiCalled, setApiCalled] = useState(false);
  const hasMounted = useRef(false);
  const navigate = useNavigate();
  const handleProgress = async (e) => {
    dispatch(updateProgress(playerRef.current.getCurrentTime()));
    if (Math.floor(playerRef.current.getCurrentTime()) > 10 && !apiCalled) {
      try {
        setApiCalled(true);
        const data = await OriginalRequest(
          `songs/addSongStream/${currentSong._id}`,
          "POST"
        );

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSongEnd = (e) => {
    console.log("song end!");
    if (
      (userInfo._id &&
        userInfo.songs_purchased.includes(currentSong._id) &&
        currentSong.is_exclusive) ||
      !currentSong.is_exclusive
    ) {
      dispatch(finishSong());
    } else {
      console.log("huuh");
      handleOpen();
    }
  };
  useEffect(() => {
    if (hasMounted.current) {
      setApiCalled(false);
    } else {
      hasMounted.current = true;
    }
  }, [currentSong._id, hasMounted]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "rgb(38 40 41)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "#eaebe4s",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(finishSong());
  };
  return (
    <div>
      <div className="hidden">
        {currentSong._id && (
          <ReactPlayer
            ref={playerRef}
            url={`http://localhost:9999/api/songs/streamSong/${currentSong._id}`}
            controls
            width="100%"
            height="50px"
            playing={isPlaying}
            key={currentSong._id}
            loop={loop}
            onStart={(e) => {
              console.log(sliderValue);
            }}
            onProgress={(e) => {
              handleProgress(e);
            }}
            volume={volume / 100}
            onEnded={(e) => {
              handleSongEnd(e);
            }}
          />
        )}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"#DA8F66"}
            >
              {currentSong.song_name}
            </Typography>
            <img
              src={currentSong.cover_image}
              className="w-52 h-52 mx-auto object-cover object-center rounded-md"
            />
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              color={"#ADADAD"}
            >
              This is a preview version of an{" "}
              <span>exclusive release</span>. You can
              purchase the song to enjoy the full version and support{" "}
              <a
                href={`/artist/${currentSong?.artist?._id}`}
                className="text-sky-600"
              >
                {currentSong?.artist?.artist_name}
              </a>
            </Typography>
            <button className="bg-dark10 px-5 py-3 rounded-md mt-3 mx-auto" onClick={(e)=>{
              dispatch(setPurchaseSong(currentSong));
              navigate("payment/purchase")
            }}>
              Buy The Song
            </button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
