import DefaultTemplate from "../template/DefaultTemplate";
import SongListWithStreamCount from "../component/SongListWithStreamCount";
import AlbumList from "../component/AlbumsList";
import AudioVisualizer from "../component/AudioVisualizer"
export default function SongDetail() {
  return (
    <DefaultTemplate>
      <div className="w-full max-h items-center justify-center relative ">
        <div className="flex flex-row bg-light60 dark:bg-dark60 ml-10">
          <img
            src="https://res.cloudinary.com/djzdhtdpj/image/upload/v1709269357/png-transparent-phonograph-record-lp-record-music-others-miscellaneous-album-disc-jockey-thumbnail_1_dd0lc3.png"
            className="w-64 h-full left-40 relative animate-spin"
            style={{ animationDuration: "10000ms" }}
          />
          <img
            className="w-64 h-64"
            style={{ position: "absolute" }}
            src="https://2.bp.blogspot.com/-Nc9YO_-F8yI/TcSIAB-nR-I/AAAAAAAAAGI/hPkuxqkqVcU/s1600/music-clipartMUSIC1.jpg">
          </img>
          <div className=" ml-40">
            <h1 className="text-lightText dark:text-darkText font-semibold text-xl ml-10" >Lovely</h1>
            <h2 className="ml-10">Genre: ROCK</h2>
            <h2 className="ml-10">Release by: Huy ngu</h2>
            <h2 className="ml-10">Release date: 12/12/2002</h2>
            <AudioVisualizer />
          </div>
        </div>
        <div className="bg-light60 dark:bg-dark60 px-5">
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
