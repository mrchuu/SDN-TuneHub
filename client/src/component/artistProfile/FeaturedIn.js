import { useEffect, useRef, useState } from "react";
import PerformRequest from "../../utilities/PerformRequest";
import { FaPlayCircle, FaRegHeart } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  addSongToQueue,
  setCurrentSong,
  toogleIsPlaying,
} from "../../redux/player";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MdLibraryMusic, MdOutlineQueueMusic } from "react-icons/md";

export default function FeaturedIn({ url }) {
  const { OriginalRequest } = PerformRequest();
  const hasMounted = useRef(false);
  const [featuredSongs, setFeaturedSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
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
        try {
          console.log("aaaa");
          setLoading(true);
          const data = await OriginalRequest(url, "GET");
          if (data) {
            setFeaturedSongs(data.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        hasMounted.current = true;
      }
    };
    fetch();
  }, [hasMounted, url]);
  return (
    <div className="mt-5">
      {featuredSongs.length > 0 ? (
        <div className="w-full flex flex-wrap">
          {featuredSongs.map((featuredSong) => (
            <div
              key={featuredSong._id} // Add a unique key to each element in the array
              className={`card border lg:w-2/12 md:w-4/12 sm:w-6/12 pb-2 rounded  hover:bg-light30 hover:dark:bg-dark30 hover:shadow-md hover:shadow-neutral-400 hover:dark:shadow-blue-600/40 dark:border-none ${
                menuIsOpen && songInAction._id === featuredSong._id
                  ? "bg-light30 dark:bg-dark30 shadow-md shadow-neutral-400 dark:shadow-blue-600/40"
                  : ""
              }`}
            >
              <div className="py-2 px-3">
                <div className="relative">
                  <div
                    className={`absolute inset-0 group bg-black bg-opacity-0 hover:bg-opacity-65 ${
                      menuIsOpen && songInAction._id === featuredSong._id
                        ? "bg-opacity-65"
                        : ""
                    } rounded-md flex items-center justify-center backdrop-filter`}
                  >
                    <div
                      className={`flex opacity-0 group-hover:opacity-80 ${
                        menuIsOpen && songInAction._id === featuredSong._id
                          ? "opacity-80"
                          : ""
                      } justify-around items-center w-full`}
                    >
                      <FaRegHeart
                        className="text-light10 dark:text-dark10"
                        size={20}
                      />
                      <FaPlayCircle
                        className="text-light10 dark:text-dark10"
                        size={40}
                        onClick={(e) => {
                          dispatch(setCurrentSong(featuredSong));
                          dispatch(toogleIsPlaying(true));
                        }}
                      />
                      <IoEllipsisHorizontal
                        className="text-light10 dark:text-dark10"
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation();
                          openMenu(e, featuredSong);
                        }}
                      />
                    </div>
                  </div>
                  <img
                    src={featuredSong.cover_image}
                    className="w-44 h-44 rounded-md mx-auto border-2 border-neutral-400/20 object-cover object-center"
                  />
                </div>
              </div>

              <div className="lg:px-3 md:px-3 sm:px-8">
                <p className="text-lightText dark:text-darkText font-medium line-clamp-1 overflow-ellipsis">
                  {featuredSong.song_name}
                </p>
                <p className="text-lightTextSecondary text-sm dark:text-darkTextSecondary line-clamp-2 overflow-ellipsis">
                  {featuredSong.artist.artist_name}
                  {featuredSong.participated_artist.map(
                    (artist) => ", " + artist.artist_name
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      <Menu
        open={menuIsOpen}
        anchorEl={songMenuAnchor}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        autoFocus={false}
      >
        <MenuItem
          className="flex items-center"
          onClick={(e) => {
            dispatch(addSongToQueue(songInAction));
            closeMenu(e);
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
