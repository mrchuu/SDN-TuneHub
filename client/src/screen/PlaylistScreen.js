
import DefaultTemplate from "../template/DefaultTemplate";
import { useEffect, useRef, useState } from "react";
import PerformRequest from "../utilities/PerformRequest";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaPlay, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  setCurrentSong,
  toogleIsPlaying,
  addSongToQueue,
} from "../redux/player.js";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MdLibraryMusic, MdOutlineQueueMusic } from "react-icons/md";



const PlaylistScreen = () => {

  const [playlist, setPlaylist] = useState(null);
  const [SongList, setSongList] = useState([]);
  const { OriginalRequest } = PerformRequest();
  const dispatch = useDispatch();
  const hasMounted = useRef(false);
  const [songMenuAnchor, setSongMenuAnchor] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [songInAction, setSongInAction] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentPlaylistSongs, setCurrentPlaylistSongs] = useState([]);
  const handleSelectPlaylist = (playlist) => {
    setCurrentPlaylist(playlist);
    setCurrentPlaylistSongs(playlist.songs);
  };


  const closeMenu = (e, song) => {
    setMenuIsOpen(false);
    setSongMenuAnchor(null);
  };
  const openMenu = (e, song) => {
    setSongInAction(song);
    setMenuIsOpen(true);
    setSongMenuAnchor(e.currentTarget);
  };
  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const [showAddToPlaylistMenu, setShowAddToPlaylistMenu] = useState(false);

  const handleAddToPlaylist = () => {
    setShowAddToPlaylistMenu(true);
  };

  const handleCreatePlaylist = () => {
    console.log("Create playlist clicked");
    closeMenu(); // Đóng menu
  };

  const handleListPlaylist = () => {
    console.log("List playlist clicked");
    closeMenu(); // Đóng menu
  };

  //sửa cái này thành list song của playlist
  useEffect(() => {
    const fetch = async () => {
      if (hasMounted.current) {
        const data = await OriginalRequest("songs/getAll", "GET");
        if (data) {
          setSongList(data.data);
        }
      } else {
        hasMounted.current = true;
      }
    };
    fetch();
  }, [hasMounted]);
  useEffect(() => {
    setTimeout(() => {
      setPlaylist(fakePlaylists[0]);
    }, 1000);
  }, []);

  const fakePlaylists = [
    {
      id: 1,
      name: "Chill Vibesheeeeeeeeeeeeeeeeêhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
      creator: "John Doe",
      image: "https://rdsic.edu.vn/blog/toan/hinh-nen-dep-meo-cute-tao-khong-gian-tuoi-sang-va-ruc-ro-cho-tre-nho-vi-cb.html",
      songs: [
        { id: 1, title: "Song 1", artist: "Artist 1", album: "Album 1", dateAdded: "2024-03-02", time: "03:45" },
        { id: 2, title: "Song 2", artist: "Artist 2", album: "Album 2", dateAdded: "2024-03-02", time: "04:15" },
        { id: 3, title: "Song 3", artist: "Artist 3", album: "Album 3", dateAdded: "2024-03-02", time: "05:00" }
      ]
    },
    {
      id: 2,
      name: "Workout Beats",
      creator: "Jane Smith",
      image: "https://rdsic.edu.vn/blog/toan/hinh-nen-dep-meo-cute-tao-khong-gian-tuoi-sang-va-ruc-ro-cho-tre-nho-vi-cb.html",
      songs: [
        { id: 4, title: "Song 4", artist: "Artist 4", album: "Album 4", dateAdded: "2024-03-02", time: "05:30" },
        { id: 5, title: "Song 5", artist: "Artist 5", album: "Album 5", dateAdded: "2024-03-02", time: "06:00" },
        { id: 6, title: "Song 6", artist: "Artist 6", album: "Album 6", dateAdded: "2024-03-02", time: "07:00" }
      ]
    }
  ];


  return (
    <DefaultTemplate>
      <div className="w-full min-h-screen ">
        <div className="container mx-auto p-4">
          {/* Render selected playlist */}
          {playlist && (
            <div className="relative flex items-center mb-8 bg-light30 dark:bg-dark30 rounded-lg p-6 shadow-lg">
              <img src={playlist.image} alt={playlist.name} className="w-64 h-auto mr-8 shadow-lg" />
              <div className="flex flex-col text-lightText dark:text-darkText">
                <span className="text-sm  text-lightText dark:text-darkText font-medium mb-2">Playlist</span>
                <h2 className="text-3xl font-bold mb-2">{playlist.name}</h2>
                <div className="flex items-center">
                  <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
                    <img src={playlist.creatorAvatar} alt={playlist.creator} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-base font-semibold mr-2">{playlist.creator}</p>
                  <span className="text-base">•</span>
                  <p className="text-base font-semibold ml-2">{playlist.songs.length} songs</p>
                </div>
              </div>
            </div>
          )}

          {/* Render list of songs */}
          <div className="w-full flex px-5 md:px-10 items-center mt-5">
      <table className="w-full text-lightText dark:text-darkText">
        <thead className="font-semibold">
          <tr className="border-b border-neutral-300">
            <td className="w-1/12 text-center">#</td>
            <td className="w-5/12">Song</td>
            <td className="hidden md:table-cell md:w-5/12">Album</td>
            <td className="w-1/12"></td>
          </tr>
        </thead>
        <tbody className="text-lightTextSecondary dark:text-darkTextSecondary hover:po">
          {SongList.map((song, index) => (
            <tr
              className="border-b border-neutral-300 hover:bg-light30 dark:hover:bg-dark30 cursor-pointer group"
              key={song._id}
              onClick={(e) => {
                dispatch(setCurrentSong(song));
                dispatch(toogleIsPlaying(true));
              }}
            >
              <td className="w-1/12 text-center">{index + 1}</td>
              <td className="w-5/12 py-2">
                <div className="flex items-center">
                  <div
                    style={{ backgroundImage: `url('${song.cover_image}')` }}
                    className={`relative w-14 h-14 bg-cover bg-center flex items-center justify-center rounded-md shadow-lg shadow-neutral-400 dark:shadow-blue-800 dark:shadow-sm`}
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-md"></div>

                    <FaPlay className="text-light10 dark:text-dark10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  </div>

                  <div className="ml-2">
                    <h4 className="font-semibold text-md">{song.song_name}</h4>
                    <p className="text-xs">{song.artist.artist_name}</p>
                  </div>
                </div>
              </td>
              <td className="hidden md:table-cell md:w-5/12">
                {song.album ? "album" : ""}
              </td>
              <td className="w-1/12">
                <IoEllipsisHorizontal
                  onClick={(e) => {
                    e.stopPropagation();
                    openMenu(e, song);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Menu
        open={menuIsOpen}
        anchorEl={songMenuAnchor}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        autoFocus={false}
      >
        <MenuItem>
          <ListItemIcon>
            <FaPlus
              className="text-light10 dark:text-dark10 mt-1"
              size={18}
            />
            <ListItemText>&nbsp;Add To Playlist</ListItemText>
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          className="flex items-center"
          onClick={(e) => {
            console.log(songInAction);
            dispatch(addSongToQueue(songInAction));
            closeMenu(e)
          }}
        >
          <ListItemIcon>
            <MdOutlineQueueMusic
              size={22}
              className="text-light10 dark:text-dark10 mr-3"
            />
            <ListItemText className="text-right">Queue Song</ListItemText>
          </ListItemIcon>
        </MenuItem>
        <MenuItem className="flex items-center">
          <ListItemIcon>
            <MdLibraryMusic
              size={20}
              className="text-light10 dark:text-dark10 mr-3"
            />
            <ListItemText className="text-right">Add To Playlist</ListItemText>
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </div>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default PlaylistScreen;
