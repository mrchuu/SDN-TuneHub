import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PerformRequest from "../utilities/PerformRequest.js";

const ListPlaylist = ({ songId }) => {
    console.log(songId);
  const navigate = useNavigate();
  // const [playlists, setPlaylists] = useState([]);
  const playlists = useSelector(
    (state) => state.auth.userInfo.playlist_created
  );

  const detailPlaylist = (playlistId) => {
    navigate(`/playlist/${playlistId}`);
  };

  const { OriginalRequest } = PerformRequest();

  const addSongToPlaylist = async (playlistId) => {
    await OriginalRequest(`playlist/push`, "POST", {
      playlistId: playlistId,
      songs: songId,
    });
  };

  return (
    <div className="px-3 mt-2">
      <div className="px-3 text-textSecondary text-lightText dark:text-darkText text-sm font-medium">
        {playlists?.map((playlist) => (
          <div
            onClick={() => {
              if (songId == undefined) {
                detailPlaylist(playlist.playlistId);
              } else {
                addSongToPlaylist(playlist.playlistId);
              }
            }}
            className="flex items-center mb-3"
            key={playlist._id}
          >
            <img
              className="w-10 h-10 rounded-full border-slate-600 border-2 text-lightText dark:text-darkText"
              src={playlist.play_list_cover}
              alt={playlist.play_list_name}
            />
            &nbsp;<span>{playlist.play_list_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPlaylist;
