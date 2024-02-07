import { useEffect, useRef, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import SERVER_URL from "../config.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PerformRequest from "../utilities/PerformRequest.js";
export default function HomePage() {
  // const playerRef = useRef(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const hasMounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasMounted.current) {
        const result = await PerformRequest.OriginalRequest(
          "auth/user",
          navigate,
          "GET"
        );
        console.log(result);
        if (result) {
          setUserName(`${result.first_name} ${result.last_name}`);
        }
      } else {
        hasMounted.current = true;
      }
    };
    fetchData();
  }, [hasMounted]);
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
      <div className="w-full bg-primaryBg flex items-center justify-center">
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
        {userName.length > 0 && (
          <h4 className="text-textSecondary text-center ">Hello {userName}</h4>
        )}
      </div>
    </DefaultTemplate>
  );
}
