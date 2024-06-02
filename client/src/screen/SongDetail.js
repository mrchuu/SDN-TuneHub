import NoSpaceHeaderTemplate from "../template/NoSpaceHeaderTemplat";
import SongList from "../component/SongList.js";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PerformRequest from "../utilities/PerformRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SoundWaveCanvas from "../component/SoundWaveCanvas.js";
import { setScrollPos } from "../redux/window";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import {
  setCurrentSong,
  toogleIsPlaying,
  addSongToQueue
} from "../redux/player.js";
import { MdLibraryMusic, MdOutlineQueueMusic } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import auth, { setUserInfo } from "../redux/auth.js";
import PlayListAddMenu from "./PlayListAddMenu.js";
import { FaPlay } from "react-icons/fa";

export default function SongDetail() {
  const { songId } = useParams();
  const [song, setSong] = useState({});
  const [SongLists, setSongLists] = useState([]);
  const { OriginalRequest } = PerformRequest();
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const scrollPos = useSelector((state) => state.window.scrollPos);
  const currentSong = useSelector((state) => state.player.currentSong);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [songMenuAnchor, setSongMenuAnchor] = useState(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [songInAction, setSongInAction] = useState(null);
  const [subMenuIsOpen, setSubMenuIsOpen] = useState(false);
  const [playlistMenuAnchor, setPlaylistMenuAnchor] = useState(null);

  const closeMenu = (e, song) => {
    setMenuIsOpen(false);
    setSongMenuAnchor(null);
  };
  const openMenu = (e, song) => {
    setSongInAction(song);
    setMenuIsOpen(true);
    setSongMenuAnchor(e.currentTarget);
  };

  const openMenuPlaylist = (e, song) => {
    setSubMenuIsOpen(true);
    setPlaylistMenuAnchor(e.currentTarget);
  };

  const closeMenuPlaylist = (e, song) => {
    setSubMenuIsOpen(false);
    setPlaylistMenuAnchor(null);
  };

  const handleCreatePlaylist = async () => {
    const response = await OriginalRequest(`playlist/create`, "POST", {
      songs: songInAction,
    });
    if (response) {
      const user = await OriginalRequest("auth/user", "GET");
      dispatch(setUserInfo(user.data));
      closeMenuPlaylist();
    }
    closeMenu();
  };

  const handlePayment = async () => {
    const vnpayUrl = await OriginalRequest(
      "payment/create_payment_url",
      "POST",
      {
        amount: song.price,
        bankCode: "NCB",
        songId: song._id,
        language: "en",
      }
    );
    if (vnpayUrl) {
      window.location = vnpayUrl.data;
    }
  };
  const fetchSong = async () => {
    try {
      const data = await OriginalRequest(`songs/detailSong/${songId}`, "GET");
      if (data && data.data) {
        setSong(data.data[0]);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      dispatch(setScrollPos(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchSong();
  }, [songId, onchange]);

  const formatCreatedAt = (createdAt) => {
    if (createdAt) {
      return createdAt.split("T")[0];
    }
    return "";
  };

  const handleSongChange = async (newSongId) => {
    try {
      const data = await OriginalRequest(
        `songs/detailSong/${newSongId}`,
        "GET"
      );
      if (data) {
        setSong(data.data);
      }
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  return (
    <NoSpaceHeaderTemplate>
      <div className="overflow-hidden">
        {song && (
          <div
            className={`profileHeader w-full h-96 relative`}

          >
            <div style={{
              backgroundImage: `url('${song.cover_image}')`,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              filter: 'blur(5px)'
            }} className="w-full h-96 bg-center bg-cover"></div>
            <div className={`w-full h-full pt-56 relative`}>
              <div
                className="absolute inset-0 bg-light30 dark:bg-dark30"
                style={{ opacity: `${(scrollPos * 0.7) / 180}` }}
              >
              </div>
              <div className="bg-light30 dark:bg-dark30 max-w h-44 rounded-lg m-10">
                <div className="flex items-center h-full pl-12 ">
                  <img src={song.cover_image} alt={song.song_name} className={`w-36 h-36 rounded-full object-cover object-center ${isPlaying ? "animate-spinSlow" : ""}`} />
                  <FaPlay className="absolute hover:opacity-50 size-9 text-light10 dark:text-dark10 left-0 ml-32"
                    key={song._id}
                    onClick={(e) => {
                      dispatch(setCurrentSong(song));
                      dispatch(toogleIsPlaying(true));
                    }} />
                  <div className="text-dark60 dark:text-light60 m-2 ml-4">
                    <h1 className="text-3xl font-bold ml-2">{song.song_name}</h1>
                    <p className="text-2xl m-2">{song.genre}</p>
                    <p className="text-1xl m-2">{formatCreatedAt(song.createdAt)}</p>
                    {song.is_exclusive ? (
                      userInfo && userInfo?.songs_purchased?.includes(currentSong._id) ? (
                        <span className="text-white px-2 bg-sky-600/70 text-lg rounded ml-14 font-medium">
                          OWNED
                        </span>
                      ) : (
                        <>
                          <span className="text-white px-2 bg-amber-500 text-lg rounded ml-2 font-medium" onClick={handlePayment}>
                            BUY {song.price}VND
                          </span>
                        </>
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className="text-dark60 dark:text-light60 w-12 h-12 absolute right-0 mr-10">
                    <IoEllipsisHorizontal onClick={(e) => {
                      e.stopPropagation();
                      openMenu(e, song);
                    }} />
                  </p>
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
                        console.log(songInAction);
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
                    <MenuItem className="flex items-center"
                      onClick={(e) => {
                        openMenuPlaylist(e);
                      }}>
                      <ListItemIcon>
                        <MdLibraryMusic
                          size={20}
                          className="text-light10 dark:text-dark10 mr-3"
                        />
                        <ListItemText className="text-right">Add To Playlist</ListItemText>
                      </ListItemIcon>
                    </MenuItem>
                  </Menu>
                  <Menu
                    anchorEl={playlistMenuAnchor}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={subMenuIsOpen}
                    onClose={() => setSubMenuIsOpen(false)}
                  >
                    <MenuItem className="cursor-pointer" onClick={handleCreatePlaylist}>Create a Playlist</MenuItem>
                    <div style={{ overflowY: "auto", maxHeight: "200px" }}>
                      <PlayListAddMenu songId={songInAction} />
                    </div>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="bg-light60 dark:bg-dark60 px-5">
          <h4 className="text-lightText dark:text-darkText font-semibold text-xl m-10 mt-20">
            Participated Artist
          </h4>
          <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary ml-8 w-full">
            {song.participated_artists_users && song.participated_artists_users.map((user, index) => (
              <div
                key={index}
                className="card p-4 ml-4 mr-5 border rounded-md bg-light30 dark:bg-dark30 relative shadow-md shadow-neutral-400 dark:shadow-blue-500/50 dark:shadow-md dark:border-none mb-8"
              >
                <img
                  src={user.profile_picture}
                  className="rounded-full w-40 h-40 object-cover object-center"
                />
                <h3 className="text-lg font-semibold dark:text-white m-2">
                  <Link
                    to={`/artist/${song.participated_artists_details[index]._id}`}
                    className="text-xs hover:underline"
                    style={{ fontSize: "1.125rem", lineHeight: "1.25rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {song.participated_artists_details[index].artist_name}
                  </Link>
                </h3>
                <h3 className="m-2">{user.introduction}</h3>
                <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2">
                </p>
              </div>
            ))}
          </div>
          <div className="px-5">
            <h4 className="text-lightText dark:text-darkText font-semibold text-xl m-5">
              Popular Tracks
            </h4>
            <SongList onSongChange={handleSongChange} />
          </div>
          <div className="h-5"></div>
        </div>
      </div>
    </NoSpaceHeaderTemplate >
  );
}
