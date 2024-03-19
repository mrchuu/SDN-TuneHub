import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DefaultTemplate from "../template/DefaultTemplate";
import PerformRequest from "../utilities/PerformRequest";
import SongList from "../component/SongList.js";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdLibraryMusic, MdOutlineQueueMusic } from "react-icons/md";
import auth, { setUserInfo } from "../redux/auth.js";

const PlaylistScreen = () => {
  const [playlist, setPlaylist] = useState(null);
  const { OriginalRequest } = PerformRequest();
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const userInfo = useSelector((state) => state.auth.userInfo); // Lấy dữ liệu người dùng từ Redux store

  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await OriginalRequest(
      `playlist/getPlaylistById/${playlistId}`,
      "GET"
    );
    if (data) {
      setPlaylist(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [playlistId]);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [songMenuAnchor, setSongMenuAnchor] = useState(null);

  const closeMenu = (e, song) => {
    setMenuIsOpen(false);
    setSongMenuAnchor(null);
  };
  const openMenu = (e, song) => {
    setMenuIsOpen(true);
    setSongMenuAnchor(e.currentTarget);
  };

  const handleDeletePlaylist = async () => {
    const fetch = async () => {
      await OriginalRequest(`playlist/deletePlaylist/${playlistId}`, "DELETE");
    };

    await fetch();
    const user = await OriginalRequest("auth/user", "GET");
    dispatch(setUserInfo(user.data));
    closeMenu();
    navigate("/");
  };

  return (
    <DefaultTemplate>
      <div className="w-full min-h-screen">
        <div className="container mx-auto p-4">
          {/* Render selected playlist */}
          {playlist && (
            <div className="relative flex items-center mb-8 bg-light30 dark:bg-dark30 rounded-lg p-6 shadow-lg">
              <div className="w-64 h-64 mr-8 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={playlist.play_list_cover}
                  alt={playlist.play_list_name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col text-lightText dark:text-darkText">
                <span className="text-sm text-lightText dark:text-darkText font-medium mb-2">
                  Playlist
                </span>
                <h2 className="text-3xl font-bold mb-2">
                  {playlist.play_list_name}
                </h2>
                <div className="flex items-center">
                  <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
                    <img
                      src={userInfo.profile_picture}
                      alt={`${userInfo.first_name} ${userInfo.last_name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-base font-semibold">{`${userInfo.first_name} ${userInfo.last_name}`}</p>
                  <span className="text-base">•</span>
                  <p className="text-base font-semibold ml-2">
                    {playlist.songs.length} songs
                  </p>
                </div>

                <div className="w-10 right-2 absolute top-0 m-auto">
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
                    <MenuItem onClick={handleDeletePlaylist}>
                      <ListItemIcon>
                        <MdLibraryMusic
                          size={20}
                          className="text-light10 dark:text-dark10 mr-3"
                        />
                        <ListItemText className="text-right">
                          DeletePlaylist
                        </ListItemText>
                      </ListItemIcon>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          )}
          {playlist && (
            <SongList url={`playlist/getAllSongsByPlaylistId/${playlistId}`} />
          )}
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default PlaylistScreen;
