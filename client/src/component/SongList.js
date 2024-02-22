import { useEffect, useRef, useState } from "react";
import PerformRequest from "../utilities/PerformRequest";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import {
  setCurrentSong,
  toogleIsPlaying,
  addSongToQueue,
} from "../redux/player.js";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MdLibraryMusic, MdOutlineQueueMusic } from "react-icons/md";
export default function SongList() {
  const [SongList, setSongList] = useState([]);
  const { OriginalRequest } = PerformRequest();
  const dispatch = useDispatch();
  const hasMounted = useRef(false);
  const [songMenuAnchor, setSongMenuAnchor] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [songInAction, setSongInAction] = useState(null);
  const closeMenu = (e, song) => {
    setMenuIsOpen(false);
    setSongMenuAnchor(null);
  };
  const openMenu = (e, song) => {
    setSongInAction(song);
    setMenuIsOpen(true);
    setSongMenuAnchor(e.currentTarget);
  };
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
  return (
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
            <FaRegHeart
              className="text-light10 dark:text-dark10 mt-1"
              size={18}
            />
            <ListItemText>&nbsp;Add To Favorite</ListItemText>
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
  );
}
