import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const ListPlaylist = ({ songId }) => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const contextMenuRef = useRef(null);

    const handlePlaylistClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    const handleContextMenu = (event, playlist) => {
        event.preventDefault();
        setSelectedPlaylist(playlist);
    };

    const handleDeletePlaylist = async () => {
        try {
            const response = await fetch(`http://localhost:9999/api/playlist/deletePlaylist/${selectedPlaylist._id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                fetchData();
                setSelectedPlaylist(null); // Ẩn menu context sau khi xóa playlist thành công
            } else {
                console.error('Failed to delete playlist:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:9999/api/playlist/getAllPlaylistsByUserId/${userInfo._id}`, {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                setPlaylists(data.data);
            } else {
                console.error('Response not ok:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setSelectedPlaylist(null); // Ẩn menu context nếu click ra ngoài
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="px-3 mt-2">
            <div className="px-3 text-textSecondary text-lightText dark:text-darkText text-sm font-medium">
                {playlists.map((playlist) => (
                    !playlist.songs.find(song => song.songId === songId) && // Sử dụng songId từ props để kiểm tra
                    <div
                        key={playlist._id}
                        onContextMenu={(e) => handleContextMenu(e, playlist)}
                        onClick={() => handlePlaylistClick(playlist._id)}
                        className="flex items-center mb-3"
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

            {/* Context Menu */}
            {selectedPlaylist && (
                <div ref={contextMenuRef} className="absolute bg-white border border-gray-200  shadow-md rounded-md py-2">
                    <div onClick={handleDeletePlaylist} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete Playlist</div>
                </div>
            )}
        </div>
    );
};

export default ListPlaylist;
