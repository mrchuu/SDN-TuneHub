import DefaultTemplate from "../template/DefaultTemplate";
import SongListWithStreamCount from "../component/SongListWithStreamCount";
import AlbumList from "../component/AlbumsList";
import AudioVisualizer from "../component/Audio"
export default function SongDetail() {
  return (
    <DefaultTemplate>
      <div className="w-full max-h items-center justify-center relative ">
        <div className="flex flex-row bg-light60 dark:bg-dark60 ml-10 bo">
          <img
            src="https://res.cloudinary.com/djzdhtdpj/image/upload/v1709269357/png-transparent-phonograph-record-lp-record-music-others-miscellaneous-album-disc-jockey-thumbnail_1_dd0lc3.png"
            className="w-64 h-full left-40 relative animate-spin"
            style={{ animationDuration: "10000ms" }}
          />
          <img
            className="w-64 h-64 right-100"
            style={{ position: "absolute" }}
            src="https://2.bp.blogspot.com/-Nc9YO_-F8yI/TcSIAB-nR-I/AAAAAAAAAGI/hPkuxqkqVcU/s1600/music-clipartMUSIC1.jpg">
          </img>
        </div>
        <div className="bg-light60 dark:bg-dark60 px-5">
          <div>
            <AudioVisualizer />
          </div>
          <h4 className="text-lightText dark:text-darkText font-semibold text-xl">
            Popular Tracks
          </h4>
          <div className="px-5">
            <SongListWithStreamCount
            //   url={`songs/getArtistPopularSongs/${artistId}`}
            />
          </div>
          <h4 className="text-lightText dark:text-darkText font-semibold text-xl mt-7">
            Albums
          </h4>
        </div>
      </div>

    </DefaultTemplate>
  );
}
