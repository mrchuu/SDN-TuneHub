import DefaultTemplate from "../template/DefaultTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SongList from "../component/SongList";
import PerformRequest from "../utilities/PerformRequest.js";
import { color } from "framer-motion";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
// import '../style/explore.css'

function Explore() {
  const playlist = [
    {
      name: "Rock 'n' roll",
      image:
        "https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-hoa-tulip-001.jpg",
    },
    {
      name: "Hiphop",
      image:
        "https://tamanh.net/wp-content/uploads/2023/01/tao-dang-chup-anh-ao-dai-voi-hoa.jpg",
    },
    {
      name: "Blues",
      image:
        "https://vapa.vn/wp-content/uploads/2022/12/hinh-nen-hoa-tulip-001.jpg",
    },
    {
      name: "RnB",
      image:
        "https://tamanh.net/wp-content/uploads/2023/01/tao-dang-chup-anh-ao-dai-voi-hoa.jpg",
    },
    {
      name: "Pop",
      image:
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/18/1082524/1660404545-Fadkeqhve.jpg",
    },
    {
      name: "Classical",
      image:
        "https://cattour.vn/images/upload/images/quang-binh/deo-ngang-quang-binh/deo-ngang-quang-binh-14.jpg",
    },
    {
      name: "Electronic",
      image:
        "https://i.pinimg.com/736x/6f/a9/c3/6fa9c33211ce7c08f2cc4fcef6144b7d.jpg",
    },
    {
      name: "Country",
      image:
        "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/18/1082524/1660404545-Fadkeqhve.jpg",
    },
  ];

  const { OriginalRequest } = PerformRequest();

  const [artistList, setArtistList] = useState([]);
  const [risingArtist, setRisingArtist] = useState([]);
  const [genres, setGenres] = useState([]);

  const searchValue = useSelector((state) => state.search.searchKey);
  console.log(searchValue);

  useEffect(() => {
    const fetch = async () => {
      const searchArtistValue = await OriginalRequest(
        `artists/search/${searchValue}`,
        "GET"
      );
      if (searchArtistValue) {
        setArtistList(searchArtistValue.data);
      }
    };
    fetch();
  }, [searchValue]);

  useEffect(() => {
    const fetchRising = async () => {
      const risingArtist = await OriginalRequest(
        `artists/explore/rising`,
        "GET"
      );
      if (risingArtist) {
        setRisingArtist(risingArtist.data);
      }
    };
    fetchRising();

    const fetchGenres = async () => {
      const genresSong = await OriginalRequest(`genres/`, "GET");
      if (genresSong) {
        setGenres(genresSong.data.slice(0, 12));
      }
    };
    fetchGenres();
  }, []);

  return (
    <DefaultTemplate>
      <div className="w-full min-h-screen items-center justify-center px-10">
        {!searchValue ? (
          <>
            <div className="w-full pt-8 ">
              <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-8 dark:text-white ml-4">
                  Genres
                </h2>
              </div>
              <div className="container mx-auto flex flex-wrap items-center">
                {genres.map((genre, index) => (
                  <Link
                    to={`/songList/${encodeURIComponent(
                      `songs-getSongByGenre-50-${genre._id}`
                    )}/${genre.name}/`}
                  >
                    <div
                      style={{
                        backgroundColor: genre.bgColor ? genre.bgColor : "red",
                      }}
                      className="card w-48 h-72 ml-4 mr-5 mb-10 border rounded-lg relative shadow-2xl shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm overflow-hidden"
                    >
                      <h3 className="text-lg text-white font-bold p-2">
                        {genre.name}
                      </h3>
                      <img
                        src={
                          genre.image
                            ? genre.image
                            : "https://i.pinimg.com/736x/90/57/0a/90570addee2645866a597530721f37fd.jpg"
                        }
                        className="absolute bottom-0 right-0 w-32 h-32 object-cover object-center transform rotate-12 translate-x-3 translate-y-1"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-full pt-8 ">
              <div className="mx-auto">
                <h2 className="text-2xl font-bold mb-8 dark:text-white ml-4">
                  Rising Artist
                </h2>
              </div>
              <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary">
                {risingArtist.map((artist, index) => (
                  <Link
                    to={`/artist/${artist._id}`}
                    className="text-xs hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="card p-4 ml-4 mr-5 mb-10 border rounded-md bg-light30 dark:bg-dark30 relative shadow-md shadow-neutral-400 dark:shadow-blue-500/50 dark:shadow-md dark:border-none">
                      <img
                        src={artist.user?.profile_picture}
                        className="rounded-full w-40 h-40 object-cover object-center"
                      />
                      <h3 className="text-lg font-semibold dark:text-white m-2">
                        {artist.artist_name}
                      </h3>
                      {artist.user?.introduction ? (
                        <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                          {artist.user?.introduction}
                        </p>
                      ) : (
                        <p className="text-md text-light30 dark:text-dark30 ml-2">
                          Null
                        </p>
                      )}

                      <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                        Follow: {artist.artist_followed_count}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-full pt-8 ">
              <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-8 dark:text-white ml-4">
                  Mood and activity playlists
                </h2>
              </div>
              <div className="container mx-auto flex flex-wrap items-center">
                {playlist.map((artist, index) => (
                  <div className="w-80 h-44 card m-3 mb-4 border rounded-sm bg-light30 dark:bg-dark30 relative shadow-md shadow-neutral-200 dark:shadow-blue-300 dark:shadow-md dark:border-none">
                    <img
                      src={artist.image}
                      className="rounded-md w-full h-full object-cover object-center filter brightness-75"
                    />
                    <h3 className="absolute top-2 left-2 text-lg font-semibold text-white m-2">
                      {artist.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8 dark:text-white ml-4 mt-4">
              Songs
            </h2>
            <SongList url={`songs/search/${searchValue}`} />

            <div className="w-full pt-8 ">
              <div className="mx-auto">
                <h2 className="text-2xl font-bold mb-8 dark:text-white ml-4">
                  Artist
                </h2>
              </div>
              {artistList.length > 0 ? (
                <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary">
                  {artistList.map((artist, index) => (
                    <Link
                      to={`/artist/${artist._id}`}
                      className="text-xs hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="card p-4 ml-4 mr-5 mb-10 border rounded-md bg-light30 dark:bg-dark30 relative shadow-md shadow-neutral-400 dark:shadow-blue-500/50 dark:shadow-md dark:border-none">
                        <img
                          src={artist.user?.profile_picture}
                          className="rounded-full w-40 h-40 object-cover object-center"
                        />
                        <h3 className="text-lg font-semibold dark:text-white m-2">
                          {artist.artist_name}
                        </h3>
                        <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                          {artist.user?.introduction}
                        </p>

                        <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                          Follow: {artist.artist_followed_count}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <img
                  className="m-auto"
                  src="https://static.thenounproject.com/png/2962127-200.png"
                />
              )}
            </div>
          </>
        )}
      </div>
    </DefaultTemplate>
  );
}

export default Explore;
