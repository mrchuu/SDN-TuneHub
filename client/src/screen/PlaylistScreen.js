import React, { useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import SideBar from "../component/SideBar"; // Import CreatePlaylistForm component

const PlaylistScreen = () => {
  const [playlists, setPlaylists] = useState([]);

  // Function to add a new playlist to the list
  const addPlaylist = (playlistName) => {
    setPlaylists([...playlists, { name: playlistName }]);
  };

  return (
    <DefaultTemplate>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Playlists</h1>
        
        {/* Render existing playlists */}
        <ul>
          {playlists.map((playlist, index) => (
            <li key={index}>{playlist.name}</li>
          ))}
        </ul>

        {/* Your create playlist form */}
        <DefaultTemplate addPlaylist={addPlaylist} />
      </div>
    </DefaultTemplate>
  );
};

export default PlaylistScreen;
