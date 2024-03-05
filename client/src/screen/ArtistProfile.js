import { useParams } from "react-router";
import NoSpaceHeaderTemplate from "../template/NoSpaceHeaderTemplat";
import { useDispatch, useSelector } from "react-redux";
import { setScrollPos } from "../redux/window";
import { useEffect, useRef, useState } from "react";
import SongListWithStreamCount from "../component/SongListWithStreamCount";
import AlbumList from "../component/AlbumsList";
import PerformRequest from "../utilities/PerformRequest";
import FeaturedIn from "../component/artistProfile/FeaturedIn";

export default function ArtistProfile() {
  const dispatch = useDispatch();
  const { artistId } = useParams();
  const scrollPos = useSelector((state) => state.window.scrollPos);
  const { OriginalRequest } = PerformRequest();
  const hasMounted = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrollPos(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [artistInfo, setArtistInfo] = useState({});
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const artist = await OriginalRequest(`artists/${artistId}`, "GET");
        setArtistInfo(artist.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (hasMounted.current) {
      fetchInfo();
    } else {
      hasMounted.current = true;
    }
  }, [hasMounted]);
  return (
    <NoSpaceHeaderTemplate>
      <div className="w-full min-h-screen">
        {artistInfo._id && (
          <div>
            <div
              className={`profileHeader w-full h-96 bg-center bg-cover`}
              style={{
                backgroundImage: `url('${artistInfo.userId.profile_picture}')`,
              }}
            >
              <div className={`w-full h-full pt-56 relative`}>
                <div
                  className="absolute inset-0 bg-light30 dark:bg-dark30"
                  style={{ opacity: `${(scrollPos * 0.7) / 180}` }}
                ></div>
                <h1 className="pl-12 text-6xl font-bold text-white">
                  {artistInfo.artist_name}
                </h1>
                <div className="flex items-center mt-3">
                  <p className="pl-12 text-white">
                    {artistInfo.followersCount} followers
                  </p>
                  <button className="border-2 border-light10 px-5 py-1 text-white rounded-full ml-7">
                    follow
                  </button>
                </div>
              </div>
            </div>
            <div className="h-24 w-full bg-gradient-to-b from-light30 to-light60 dark:from-dark30 dark:to-dark60 transition-all"></div>
            <div className="px-9">
              <h4 className="text-lightText dark:text-darkText font-semibold text-xl">
                Popular Tracks
              </h4>
              <div className="px-3">
                <SongListWithStreamCount
                  url={`songs/getArtistPopularSongs/${artistId}`}
                />
              </div>
              <h4 className="text-lightText dark:text-darkText font-semibold text-xl mt-7">
                Albums
              </h4>
              <AlbumList url={`album/getAlbumsOfArtist/${artistId}`} />
              <h4 className="text-lightText dark:text-darkText font-semibold text-xl mt-2">
                Featured In
              </h4>
              <FeaturedIn url={`songs/getFeaturedSongs/${artistId}`} />
            </div>
          </div>
        )}
        <div className="h-10"></div>
      </div>
    </NoSpaceHeaderTemplate>
  );
}
