import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';





const ListPlaylist = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:9999/playlist/getAllPlaylistsByUserId/" + userInfo._id, {
                method: "GET"
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setPlaylists(data);
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




    return (
        <div className="px-3 mt-2">
            <div className="px-3 text-textSecondary text-lightText dark:text-darkText text-sm font-medium">
                {playlists.map(playlist => (
                    <div onClick={() => navigate("/playlist")} className="flex items-center mb-3" key={playlist._id}>
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
