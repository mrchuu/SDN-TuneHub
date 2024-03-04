import { useParams } from "react-router";
import NoSpaceHeaderTemplate from "../template/NoSpaceHeaderTemplat";
import { useDispatch, useSelector } from "react-redux";
import { setScrollPos } from "../redux/window";
import { useEffect } from "react";
import SongListWithStreamCount from "../component/SongListWithStreamCount";
import AlbumList from "../component/AlbumsList";

export default function ArtistProfile() {
  const dispatch = useDispatch();
  const { artistId } = useParams();
  const scrollPos = useSelector((state) => state.window.scrollPos);
  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrollPos(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <NoSpaceHeaderTemplate>
      <div className="w-full min-h-screen">
        <div className="profileHeader w-full h-96 bg-[url('https://i.ytimg.com/vi/3zI-HbAz_zY/maxresdefault.jpg')] bg-center bg-cover">
          <div className={`w-full h-full pt-56 relative`}>
            <div
              className="absolute inset-0 bg-light30 dark:bg-dark30"
              style={{ opacity: `${(scrollPos * 0.7) / 180}` }}
            ></div>
            <h1 className="pl-12 text-6xl font-bold text-white">AURORA</h1>
            <div className="flex items-center mt-3">
              <p className="pl-12 text-white">10,040,391 followers</p>
              <button className="border-2 border-light10 px-5 py-1 text-white rounded-full ml-7">
                follow
              </button>
            </div>
          </div>
        </div>
        <div className="h-24 w-full bg-gradient-to-b from-light30 to-light60 dark:from-dark30 dark:to-dark60 transition-all"></div>
        <div className="px-5">
          <h4 className="text-lightText dark:text-darkText font-semibold text-xl">
            Popular Tracks
          </h4>
          <div className="px-5">
            <SongListWithStreamCount
              url={`songs/getArtistPopularSongs/${artistId}`}
            />
          </div>
          <h4 className="text-lightText dark:text-darkText font-semibold text-xl mt-7">
            Albums
          </h4>
          <AlbumList url={`album/getAlbumsOfArtist/${artistId}`} />
        </div>
      </div>
    </NoSpaceHeaderTemplate>
  );
}
