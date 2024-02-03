
import DefaultTemplate from "../template/DefaultTemplate";

export default function HomePage() {
  // const playerRef = useRef(null);
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
      <div className="w-full bg-primaryBg">
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
      </div>
    </DefaultTemplate>
  );
}
