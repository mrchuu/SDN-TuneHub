import DefaultTemplate from "../template/DefaultTemplate";
import SongListDetail from "../component/ListSongDetail.js";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PerformRequest from "../utilities/PerformRequest.js";
import { useDispatch, useSelector } from "react-redux";

export default function SongDetail() {
  const { songId } = useParams();
  const [song, setSong] = useState(null);
  const { OriginalRequest } = PerformRequest();
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);

  const fetchSong = async () => {
    try {
      const data = await OriginalRequest(`songs/detailSong/${songId}`, "GET");
      if (data) {
        setSong(data.data);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  useEffect(() => {
    fetchSong();
  }, [songId]);

  const formatCreatedAt = (createdAt) => {
    if (createdAt) {
      return createdAt.split("T")[0];
    }
    return "";
  };

  const handleSongChange = async (newSongId) => {
    try {
      const data = await OriginalRequest(`songs/detailSong/${newSongId}`, "GET");
      if (data) {
        setSong(data.data);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  return (
    <DefaultTemplate>
      <div className="w-full max-h items-center justify-center relative">
        {song && (
          <div className="flex flex-row bg-light60 dark:bg-dark60 ml-40">
            <img
              src="https://res.cloudinary.com/djzdhtdpj/image/upload/v1709269357/png-transparent-phonograph-record-lp-record-music-others-miscellaneous-album-disc-jockey-thumbnail_1_dd0lc3.png"
              className={`w-64 h-full left-40 relative ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: "10000ms" }}
            />
            <img
              className="w-64 h-64 border border-gray-500 rounded-md"
              style={{ position: "absolute", ...song.over }}
              src={song.cover_image}
            />
            <div className="ml-40">
              <div className="ml-20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <h1 className="text-lightText dark:text-darkText font-bold text-4xl mb-5">
                      {song.song_name}
                    </h1>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="text-gray-500 font-mono text-xl">
                      Genre:
                    </div>
                    <div className="text-center text-lightText dark:text-darkText font-normal-semibold text-xl ml-2 border border-light10 bg-light10 dark:border-dark10  dark:bg-dark10 rounded-md">
                      {song.genre.name}
                    </div>
                    <div className="text-gray-500 font-mono text-xl">
                      Release by:
                    </div>
                    <div className="text-lightText dark:text-darkText font-normal-semibold  text-xl ml-2">
                      {song.artist.artist_name}
                    </div>
                    <div className="text-gray-500 font-mono text-xl">
                      Date:
                    </div>
                    <div className="text-lightText dark:text-darkText font-normal-semibold text-xl ml-2">
                      {formatCreatedAt(song.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="bg-light60 dark:bg-dark60 px-5">
          <h4 className="text-lightText dark:text-darkText font-semibold text-xl m-10">
            Popular Tracks
          </h4>
          <div className="px-5">
            <SongListDetail
              onSongChange={handleSongChange}
            />
          </div>
          <h4 className="text-lightText dark:text-darkText font-semibold text-xl mt-7">
            Albums
          </h4>
        </div>
      </div>
      <div className="h-5"></div>
    </DefaultTemplate>
  );
}
