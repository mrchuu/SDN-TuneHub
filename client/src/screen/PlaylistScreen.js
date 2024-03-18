import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DefaultTemplate from "../template/DefaultTemplate";
import SongList from "../component/SongList.js";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MdLibraryMusic, MdOutlineQueueMusic } from "react-icons/md";
import {
  addSongToQueue,
} from "../redux/player.js";



const PlaylistScreen = () => {
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { playlistId } = useParams();
  const [songMenuAnchor, setSongMenuAnchor] = useState(null);
  const userInfoFromStore = useSelector((state) => state.auth.userInfo); // Lấy dữ liệu người dùng từ Redux store
  const [userInfo, setUserInfo] = useState(userInfoFromStore);
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

  const handleDeletePlaylist = async () => {
    try {
        const response = await fetch(`http://localhost:9999/api/playlist/deletePlaylist/${playlistId}`, {
            method: "DELETE"
        });
        if (response.ok) {
          
            fetchData();
        } else {
            console.error('Failed to delete playlist:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting playlist:', error);
    }
};

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:9999/api/playlist/getPlaylistById/${playlistId}`, {
        method: "GET"
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPlaylist(data);
      } else {
        console.error('Response not ok:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [playlistId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:9999/api/playlist/getPlaylistById/${playlistId}`, {
        method: "GET"
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPlaylist(data);
      } else {
        console.error('Response not ok:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [playlistId]);

  return (
    <DefaultTemplate>

      <div className="w-full min-h-screen">
        <div className="container mx-auto p-4">
          {/* Render selected playlist */}
          {playlist && (
            <div className="relative flex items-center mb-8 bg-light30 dark:bg-dark30 rounded-lg p-6 shadow-lg">
              <div className="w-64 h-64 mr-8 overflow-hidden rounded-lg shadow-lg">
                <img src={playlist.play_list_cover} alt={playlist.play_list_name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-lightText dark:text-darkText">
                <span className="text-sm text-lightText dark:text-darkText font-medium mb-2">Playlist</span>
                <h2 className="text-3xl font-bold mb-2">{playlist.play_list_name}</h2>

                <div className="flex items-center">
                  <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
                    <img src={userInfo.profile_picture} alt={`${userInfo.first_name} ${userInfo.last_name}`} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-base font-semibold">{`${userInfo.first_name} ${userInfo.last_name}`}</p>
                  <span className="text-base">•</span>
                  <p className="text-base font-semibold ml-2">{playlist.songs.length} songs</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full flex justify-between">
                  <p className="w-12 h-12 rounded-full  flex items-center justify-center">
                    <IoEllipsisHorizontal
                      onClick={(e) => {
                        e.stopPropagation();
                        openMenu(e);
                      }}
                    />
                  </p>
                  <Menu
                    open={menuIsOpen}
                    anchorEl={songMenuAnchor}
                    onClose={closeMenu}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    autoFocus={false}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
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
                    <MenuItem>
                      <ListItemIcon>
                        <MdLibraryMusic
                          size={20}
                          className="text-light10 dark:text-dark10 mr-3"
                        />
                        <ListItemText className="text-right" onClick={handleDeletePlaylist}>
                          DeletePlaylist
                        </ListItemText>
                      </ListItemIcon>
                    </MenuItem>
                    </Menu>
                
                </div>

              </div>
            </div>
          )}
          {playlist && <SongList songs={playlist.songs} navigate={navigate} />}
          
        </div>
      </div>

    </DefaultTemplate>
  );
};

export default PlaylistScreen;
