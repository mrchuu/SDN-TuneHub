import { useEffect, useRef, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import SERVER_URL from "../config.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PerformRequest from "../utilities/PerformRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logOut } from "../redux/auth.js";
import LogOut from "../utilities/LogOut.js";
export default function HomePage() {
  const navigate = useNavigate();
  const hasMounted = useRef(false);
  const auth = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { OriginalRequest } = PerformRequest();
  const { performLogOut } = LogOut();

  // const [isPlaying, setIsPlaying] = useState(false);

  // const handleProgress = (progress) => {
  //   if (progress.playedSeconds >= 30) {
  //     // Pause the player and set the playback time to 30 seconds
  //     playerRef.current.seekTo(30);
  //     setIsPlaying(false);
  //   }
  //   console.log(progress);
  // };

  // const handlePlay = () => {
  //   setIsPlaying(true);
  // };
  return (
    <DefaultTemplate>
      <div className="w-full min-h-screen flex items-center justify-center">
        {/* <audio src="http://localhost:5000/api/getSong" controls />
        <ReactPlayer
          ref={playerRef}
          url="http://localhost:5000/api/getSong"
          controls
          onProgress={handleProgress}
          playing={isPlaying}
          onPlay={handlePlay}
          onPause={() => setIsPlaying(false)}
        /> */}
        {isLoggedIn ? (
          <h4 className="text-textSecondary text-center ">
            Hello {`${auth.first_name} ${auth.last_name}`}
          </h4>
        ) : (
          <></>
        )}
        <Link to={"/login"}>Login</Link>
        <button
          onClick={(e) => {
            performLogOut(e);
          }}
        >
          log out
        </button>
      </div>
    </DefaultTemplate>
  );
}
