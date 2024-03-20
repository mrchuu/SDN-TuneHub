import NoSpaceHeaderTemplate from "../template/NoSpaceHeaderTemplat";
import SongListDetail from "../component/ListSongDetail.js";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PerformRequest from "../utilities/PerformRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SoundWaveCanvas from "../component/SoundWaveCanvas.js";
import { setScrollPos } from "../redux/window";
export default function SongDetail() {
  const { songId } = useParams();
  const [song, setSong] = useState({});
  const { OriginalRequest } = PerformRequest();
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const scrollPos = useSelector((state) => state.window.scrollPos);
  const currentSong = useSelector((state) => state.player.currentSong);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handlePayment = async () => {
    const vnpayUrl = await OriginalRequest(
      "payment/create_payment_url",
      "POST",
      {
        amount: song.price,
        bankCode: "NCB",
        songId: song._id,
        language: "en",
      }
    );
    if (vnpayUrl) {
      window.location = vnpayUrl.data;
    }
  };
  const fetchSong = async () => {
    try {
      const data = await OriginalRequest(`songs/detailSong/${songId}`, "GET");
      if (data && data.data) {
        setSong(data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrollPos(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchSong();
  }, [songId, onchange]);

  const formatCreatedAt = (createdAt) => {
    if (createdAt) {
      return createdAt.split("T")[0];
    }
    return "";
  };

  const handleSongChange = async (newSongId) => {
    try {
      const data = await OriginalRequest(
        `songs/detailSong/${newSongId}`,
        "GET"
      );
      if (data) {
        setSong(data.data);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  return (
    <NoSpaceHeaderTemplate>
      <div className="overflow-hidden">
        {song && (
          <div
            className={`profileHeader w-full h-96 bg-center bg-cover `}
            style={{
              backgroundImage: `url('${song.cover_image}')`,
            }}
          >
            <div className={`w-full h-full pt-56 relative`}>

              <div
                className="absolute inset-0 bg-light30 dark:bg-dark30"
                style={{ opacity: `${(scrollPos * 0.7) / 180}` }}
              >
              </div>
              <h1 className="pl-12 text-6xl font-bold text-white">
                {song.song_name}
              </h1>
              <p className="pl-12 text-2xl text-white m-2">
                {song.genre}
              </p>
              <p className="pl-12 text-2xl text-white m-2">
                {formatCreatedAt(song.createdAt)}
              </p>
              {currentSong.is_exclusive ? (
                userInfo && userInfo?.songs_purchased?.includes(currentSong._id) ? (
                  <span className="text-white px-2 bg-sky-600/70 text-lg rounded ml-14 font-medium">
                    OWNED
                  </span>
                ) : (
                  <>
                    <span className="text-white px-2 bg-amber-500 text-lg rounded ml-14 font-medium">
                      EXCLUSIVE
                    </span>
                    <span className="text-white px-2 bg-amber-500 text-lg rounded ml-5 font-medium" onClick={handlePayment}>
                      ${song.price}
                    </span>
                  </>
                )
              ) : (
                <></>
              )}
              
            </div>
          </div>
        )}
        <div className="bg-light60 dark:bg-dark60 px-5">
          <h4 className="text-lightText dark:text-darkText font-semibold text-xl m-10">
            Participated Artist
          </h4>
          <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary ml-8 w-full">
            {song.participated_artists_users && song.participated_artists_users.map((user, index) => (
              <div
                key={index}
                className="card p-4 ml-4 mr-5 border rounded-md bg-light30 dark:bg-dark30 relative shadow-md shadow-neutral-400 dark:shadow-blue-500/50 dark:shadow-md dark:border-none mb-8"
              >
                <img
                  src={user.profile_picture}
                  className="rounded-full w-40 h-40 object-cover object-center"
                />
                <h3 className="text-lg font-semibold dark:text-white m-2">
                  <Link
                    to={`/artist/${song.participated_artists_details[index]._id}`}
                    className="text-xs hover:underline"
                    style={{ fontSize: "1.125rem", lineHeight: "1.25rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {song.participated_artists_details[index].artist_name}
                  </Link>
                </h3>
                <h3 className="m-2">{user.introduction}</h3>
                <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                </p>
              </div>
            ))}
          </div>
          <div className="px-5">
            <h4 className="text-lightText dark:text-darkText font-semibold text-xl m-5">
              Popular Tracks
            </h4>
            <SongListDetail onSongChange={handleSongChange} />
          </div>
          <div className="h-5"></div>
        </div>
      </div>
    </NoSpaceHeaderTemplate>
  );
}
