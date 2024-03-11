import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DefaultTemplate from "../template/DefaultTemplate";
import PerformRequest from "../utilities/PerformRequest";
import SongList from "../component/SongList.js";


const PlaylistScreen = () => {
  const [playlist, setPlaylist] = useState(null);
  const { OriginalRequest } = PerformRequest();
  const navigate = useNavigate();
  const { playlistId } = useParams();
  const userInfoFromStore = useSelector((state) => state.auth.userInfo); // Lấy dữ liệu người dùng từ Redux store
  const [userInfo, setUserInfo] = useState(userInfoFromStore); 
  

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:9999/api/playlist/getPlaylistById/${playlistId}`, {
        method: "GET"
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPlaylist(data.data);
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

              </div>
            </div>
          )}
          {playlist && <SongList url={`playlist/getAllSongsByPlaylistId/${playlistId}`} />}
        </div>
      </div>

    </DefaultTemplate>
  );
};

export default PlaylistScreen;
