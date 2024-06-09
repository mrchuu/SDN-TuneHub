import { FaPlay } from "react-icons/fa";
import { RiVipDiamondFill } from "react-icons/ri";
import { Link } from "react-router-dom";

// Correct instantiation of Intl.NumberFormat
const numberFormatter = new Intl.NumberFormat("de-DE");

export default function TrackPerformance() {
  const mockData = [
    {
      _id: "song1",
      songName: "Too sweet",
      is_exclusive: true,
      album: {
        _id: "album1",
        album_name: "Unheard",
      },
      purchase: 2000,
      streamTime: 35000000,
      artist: {
        _id: "artist1",
        name: "Hozier",
      },
      participated_artists: [
        {
          _id: "artist1",
          name: "Twenty one pilots",
        },
      ],
      cover_image:
        "https://i.scdn.co/image/ab67616d00001e022e8b4358d044b75807e30bf0",
    },
    {
      _id: "song2",
      songName: "Bitter Truth",
      is_exclusive: false,
      album: {
        _id: "album2",
        album_name: "Reality Bites",
      },
      purchase: 1500,
      streamTime: 25000000,
      artist: {
        _id: "artist1",
        name: "Hozier",
      },
      participated_artists: [
        {
          _id: "artist1",
          name: "Twenty one pilots",
        },
      ],
      cover_image:
        "https://i.scdn.co/image/ab67616d00001e022e8b4358d044b75807e30bf0",
    },
    {
      _id: "song3",
      songName: "Silent Whispers",
      is_exclusive: true,
      album: {
        _id: "album3",
        album_name: "Unspoken",
      },
      purchase: 3000,
      streamTime: 40000000,
      artist: {
        _id: "artist1",
        name: "Hozier",
      },
      participated_artists: [
        {
          _id: "artist1",
          name: "Twenty one pilots",
        },
      ],
      cover_image:
        "https://i.scdn.co/image/ab67616d00001e022e8b4358d044b75807e30bf0",
    },
    {
      _id: "song4",
      songName: "Echoes of the Past",
      is_exclusive: false,
      album: {
        _id: "album4",
        album_name: "Memories",
      },
      purchase: 1800,
      streamTime: 30000000,
      artist: {
        _id: "artist1",
        name: "Hozier",
      },
      participated_artists: [
        {
          _id: "artist1",
          name: "Twenty one pilots",
        },
      ],
      cover_image:
        "https://i.scdn.co/image/ab67616d00001e022e8b4358d044b75807e30bf0",
    },
    {
      _id: "song5",
      songName: "Fading Shadows",
      is_exclusive: true,
      album: {
        _id: "album5",
        album_name: "Twilight",
      },
      purchase: 2200,
      streamTime: 38000000,
      artist: {
        _id: "artist1",
        name: "Hozier",
      },
      participated_artists: [
        {
          _id: "artist1",
          name: "Twenty one pilots",
        },
      ],
      cover_image:
        "https://i.scdn.co/image/ab67616d00001e022e8b4358d044b75807e30bf0",
    },
    {
      _id: "song6",
      songName: "Dawn's Symphony",
      is_exclusive: false,
      album: {
        _id: "album6",
        album_name: "New Beginnings",
      },
      purchase: 2000,
      streamTime: 36000000,
      artist: {
        _id: "artist1",
        name: "Hozier",
      },
      participated_artists: [
        {
          _id: "artist1",
          name: "Twenty one pilots",
        },
      ],
      cover_image:
        "https://i.scdn.co/image/ab67616d00001e022e8b4358d044b75807e30bf0",
    },
  ];

  return (
    <div className="w-full h-full text-lightText dark:text-darkText">
      <div className="w-full">
        <table className="w-full">
          <thead className="font-semibold">
            <tr className="border-b border-neutral-300">
              <td className="w-1/12 text-center">#</td>
              <td className="w-4/12">Song</td>
              <td className="hidden md:table-cell md:w-3/12 text-center">
                Album
              </td>
              <td className="w-2/12 text-center">Purchase</td>
              <td className="w-2/12 text-center">Stream time</td>
            </tr>
          </thead>
        </table>
      </div>
      <div className="w-full h-80 overflow-y-auto overflow-x-hidden">
        <table className="w-full table-fixed">
          <tbody className="text-lightTextSecondary dark:text-darkTextSecondary">
            {mockData.map((song, index) => (
              <tr
                className="border-b border-neutral-300 hover:bg-light30 dark:hover:bg-dark30 cursor-pointer group"
                key={song._id}
                onClick={() => console.log("hehe")}
              >
                <td className="w-1/12 text-center">{index + 1}</td>
                <td className="w-4/12 py-2">
                  <div className="flex items-center">
                    <div
                      style={{ backgroundImage: `url('${song.cover_image}')` }}
                      className="relative w-14 h-14 bg-cover bg-center flex items-center justify-center rounded-md shadow-lg shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm"
                    >
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></div>
                      <FaPlay className="text-light10 dark:text-dark10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    </div>
                    <div className="ml-2">
                      <div className="flex items-center">
                        <Link
                          to={`/songdetail/${song._id}`}
                          className="text-xs hover:underline"
                          style={{ fontSize: "1rem", lineHeight: "1rem" }}
                        >
                          {song.songName}
                        </Link>
                        {song.is_exclusive && (
                          <RiVipDiamondFill className="text-yellow-500/50 ml-1" />
                        )}
                      </div>
                      {song.artist && (
                        <Link
                          to={`/artist/${song.artist._id}`}
                          className="text-xs hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {song.artist.name}
                        </Link>
                      )}
                    </div>
                  </div>
                </td>
                <td className="w-3/12 text-center hover:underline">
                  {song.album ? (
                    <Link
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      to={`/album/${song.album._id}/${song.artist._id}`}
                    >
                      {song.album.album_name}
                    </Link>
                  ) : (
                    ""
                  )}
                </td>
                <td className="text-center w-2/12">
                  {numberFormatter.format(song.purchase)}
                </td>
                <td className="text-center w-2/12">
                  {numberFormatter.format(song.streamTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
