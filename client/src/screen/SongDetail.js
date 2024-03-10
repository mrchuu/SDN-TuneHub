import DefaultTemplate from "../template/DefaultTemplate";
import SongListDetail from "../component/ListSongDetail.js";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PerformRequest from "../utilities/PerformRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function SongDetail() {
  const { songId } = useParams();
  const [song, setSong] = useState(null);
  const { OriginalRequest } = PerformRequest();
  const dispatch = useDispatch();
  const [ArtistList, setArtist] = useState([]);
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
  const fetchArtist = async () => {
    const data = await OriginalRequest("artists/leaderboard/topArtist", "GET");
    if (data) {
      setArtist(data.data);
    }
  };
  useEffect(() => {
    fetchSong();
    fetchArtist();
  }, [songId, onchange]);

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
      <div className="w-full min-h-screen items-center justify-center relative overflow-x-auto">
        {song && (
          <div className="flex flex-row bg-light60 dark:bg-dark60 ml-20">
            <img
              src="https://res.cloudinary.com/djzdhtdpj/image/upload/v1709269357/png-transparent-phonograph-record-lp-record-music-others-miscellaneous-album-disc-jockey-thumbnail_1_dd0lc3.png"
              className={`w-64 h-full left-40 relative ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: "10000ms" }}
            />
            <img
              className="w-64 h-64 rounded-md"
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
                    <div className="text-center text-lightText dark:text-darkText font-normal text-xl ml-2 border border-light10 bg-light10 dark:border-dark10  dark:bg-dark10 rounded-md">
                      {song.genre.name}
                    </div>
                    <div className="text-gray-500 font-mono text-xl">
                      Release by:
                    </div>
                    <div className="text-lightText dark:text-darkText font-normal-semibold text-xl ml-2">
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
            Top Artist
          </h4>
          <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary ml-8 w-full">
            {ArtistList.slice(0, 5).map((artist, index) => (
              <div key={artist._id} className="card p-4 ml-4 mr-5 border rounded-md bg-light30 dark:bg-dark30 relative shadow-md shadow-neutral-400 dark:shadow-blue-500/50 dark:shadow-md dark:border-none mb-8">
                <img
                  src={artist.artist_file.profile_picture}
                  className="rounded-full w-40 h-40 object-cover object-center"
                />
                <h3 className="text-lg font-semibold dark:text-white m-2">
                  {artist && (
                    <>
                      <Link
                        to={`/artist/${artist._id}`}
                        className="text-xs hover:underline"
                        style={{ fontSize: "1.125rem", lineHeight: "1.25rem" }}
                        onClick={(e) => { e.stopPropagation() }}
                      >
                        {artist.artist_name}
                      </Link>
                    </>
                  )}
                </h3>

                {artist.artist_file.introduction ? (
                  <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                    {artist.artist_file.introduction}
                  </p>
                ) : (
                  <p className="text-md text-light30 dark:text-dark30 ml-2">
                    Null
                  </p>
                )}

                <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                  Follow: {artist.followers_count}
                </p>
              </div>
            ))}
          </div>
          <div className="px-5">
            <h4 className="text-lightText dark:text-darkText font-semibold text-xl m-5">
              Popular Tracks
            </h4>
            <SongListDetail
              onSongChange={handleSongChange}
            />
          </div>
          <div className="h-5"></div>
        </div>
      </div>
    </DefaultTemplate>
  );
}
