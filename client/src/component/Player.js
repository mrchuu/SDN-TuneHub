import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { toogleIsPlaying, updateProgress } from "../redux/player.js";
import PerformRequest from "../utilities/PerformRequest.js";
export default function Player() {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const progress = useSelector((state) => state.player.progress);
  const playerRef = useRef(null);
  const { OriginalRequest } = PerformRequest();
  const [apiCalled, setApiCalled] = useState(false);
  const handleProgress = async (e) => {
    dispatch(updateProgress(playerRef.current.getCurrentTime()));
    if (Math.floor(playerRef.current.getCurrentTime()) > 10 && !apiCalled) {
      try {
        const data = await OriginalRequest(
          `songs/addSongStream/${currentSong._id}`,
          "POST"
        );
        setApiCalled(true);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    // if (Math.floor(playerRef.current.getCurrentTime()) < 10 && apiCalled) {
    //   setApiCalled(false);
    // }
  };
  useEffect(() => {
    setApiCalled(false);
  }, [currentSong._id]);
  // useEffect(() => {
  //   if (playerRef && playerRef.current) {
  //     console.log(progress);
  //     playerRef.current.seekTo(progress);
  //   }
  // }, [progress, playerRef]);
  return (
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
          onProgress={(e) => {
            handleProgress(e);
          }}
        />
      )}
    </div>
  );
}
