import SideBarItem from "./SideBarItem";
import { FaHome, FaSearch, FaChartBar, FaPlus, FaUser } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { LuChevronLast, LuChevronFirst } from "react-icons/lu";
import { createContext, useEffect, useState, useCallback } from "react";
import { BsSoundwave } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toogleExpand } from "../redux/sideBar.js";
import { BsFillPlusCircleFill, BsFolderPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from "react-dropzone";



export default function SideBar() {
  // const [expanded, setExpanded] = useState(window.innerWidth > 768);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const auth = useSelector((state) => state.auth.userInfo);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [expanded, setExpanded] = useState(window.innerWidth > 768);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);

  const [imageSrc, setImageSrc] = useState(
    auth.profile_picture
  );
  const [imageFile, setImageFile] = useState(null);
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    console.log(imageSrc);
    reader.readAsDataURL(file);
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dropzoneStyle = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center",
  };

  const openCreatePlaylistForm = () => {
    setShowCreatePlaylistModal(true);
  };
  const handleImageInputChange = (event) => {
    // Your implementation here
  };

  const fetchData = async () => {
    
    try {
      const response = await fetch("http://localhost:9999/playlist/getAllPlaylistsByUserId/" + userInfo._id , {
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

  const closeCreatePlaylistForm = () => {
    setShowCreatePlaylistModal(false);
  };

  const handleCreatePlaylist = () => {
    navigate("/playlist");
    setShowCreatePlaylistModal(false);
  };

  useEffect(() => {
    const handleResize = () => {
      // setExpanded(window.innerWidth > 768);
      dispatch(toogleExpand(window.innerWidth > 768));
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={`h-screen fixed top-0 left-0 bg-light60 dark:bg-dark60 overflow-hidden transition-all z-10 ${expanded ? "w-60" : "w-20"}`}>
    <nav className="h-full flex flex-col border-r shadow-lg border-lightTextSecondary dark:border-darkTextSecondary ">
      <div className="p-4 flex items-center justify-between">
        <div className={`flex items-center overflow-hidden transition-all ${expanded ? "w-36" : "w-0"}`}>
          <BsSoundwave color="#ff5e3a" size={33} />
          <h3 className="text-lightText dark:text-darkText font-bold text-xl">
            Tune
          </h3>
          <h3 className="text-light10 font-bold text-xl">Hub</h3>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-light30 hover:dark:bg-dark30" onClick={() => dispatch(toogleExpand(!expanded))}>
          {expanded ? (
            <LuChevronFirst className="text-lightText dark:text-darkTextSecondary" size={32} />
          ) : (
            <LuChevronLast className="text-lightText dark:text-darkTextSecondary" size={32} />
          )}
        </button>
      </div>

      <ul className="flex-col px-3 ">
        <SideBarItem icon={<FaHome size={22} className="text-lightText dark:text-darkText" />} text={"Homepage"} url={"/"} active={window.location.href === "http://localhost:3000/"}  />
        <SideBarItem icon={<FaSearch size={22} className="text-lightText dark:text-darkText" />} text={"Explore"} url={"/explore"} active={window.location.href === "http://localhost:3000/explore"}/>
        <SideBarItem icon={<FaChartBar size={22} className="text-lightText dark:text-darkText" />} text={"Leaderboard"} url={"/leaderboard"} active={window.location.href === "http://localhost:3000/leaderboard"} />
      </ul>

      <hr className={`mx-auto overflow-hidden border-lightText dark:border-darkText transition-all ${expanded ? "w-3/5" : "w-0"}`} />



      <div className="flex-1 flex-col relative navbar-content">
          <div className="px-3 mt-2">
            <div className="flex font-medium text-textSecondary py-2 items-center px-3 justify-between">
              <div className="flex items-center">
                <MdLibraryMusic size={22} className="text-lightText dark:text-darkText" />
                <span className={`overflow-hidden transition-all text-lightText dark:text-darkText ${expanded ? "w-24" : "w-0 hidden"}`}>&nbsp;Your Library</span>
              </div>
              <div className="relative">
                <button className={`overflow-hidden transition-all text-lightText dark:text-darkText ${expanded ? "w-5" : "w-0 hidden"}`} onClick={openCreatePlaylistForm}>
                  <FaPlus size={22} />
                </button>

              </div>
            </div>



            <div className="px-3 mt-2">
              <div className="px-3 text-textSecondary text-lightText dark:text-darkText text-sm font-medium">
                {playlists.map(playlist => (
                  <div onClick={() => navigate("/playlist")} className="flex  items-center mb-3" key={playlist._id}>
                    <img
                      className="w-10 h-10 rounded-full border-slate-600 border-2 text-lightText dark:text-darkText"
                      src={playlist.play_list_cover}
                      alt={playlist.
                        play_list_name}
                    />
                    &nbsp;<span onClick={() => navigate("/playlist")}>{playlist.play_list_name }</span>
                  </div>
                ))}
              </div>
            </div>



            {/* <div style={{ height: "1000px" }}></div> */}
          </div>
          <div className="px-3 text-lightText dark:text-darkText">
            <div className="font-medium text-textSecondary py-2 px-3">
              <div className="flex items-center">
                <FaUser size={22} />
                &nbsp;
                <span
                  className={`overflow-hidden transition-all ${expanded ? "w-52" : "w-0 hidden"
                    }`}
                >
                  Followed Artists
                </span>
              </div>
            </div>
          </div>
          <div
            className={`max-h-40 overflow-hidden transition-all ${expanded ? "w-full" : "w-0 hidden"
              }`}
            style={{ overflowY: "auto" }}
          >
            <div className="px-3 mt-2">
              {!userInfo.artist_followed ||
                userInfo?.artist_followed?.length === 0 ? (
                <div className="bg-light30 py-2 px-3 font-medium rounded-md dark:bg-dark30">
                  <span className="text-lightText dark:text-darkText">
                    Find some artist to follow
                  </span>
                  <p className="text-xs text-lightTextSecondary dark:text-darkTextSecondary">
                    We'll keep you updated on latest release
                  </p>
                  <button className="bg-light10 dark:bg-dark10 px-5 py-2 my-2 rounded-lg text-white hover:text-slate-950">
                    Browse artists
                  </button>
                </div>
              ) : (
                <div className="px-3 text-textSecondary text-sm font-medium">
                  {userInfo.artist_followed.map((artist) => (
                    <div className="flex items-center mb-3" key={artist._id}>
                      <img
                        className="w-10 h-10 rounded-full border-slate-600  border-2"
                        src={artist.userId.profile_picture}
                      />
                      &nbsp;<span className="text-lightText dark:text-darkTextSecondary">{artist.artist_name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      {showCreatePlaylistModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative w-80 bg-white rounded-lg shadow-md z-10 p-4">
            <button onClick={closeCreatePlaylistForm} className="absolute top-2 right-2 text-gray-500 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Enter playlist name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full px-4 py-2 border border-black-300 rounded-lg focus:outline-none focus:border-primary mb-4"
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#333',
                backgroundColor: '#f7f7f7',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
            <div className="flex justify-center items-center mb-4">
              <label htmlFor="imageInput" className="cursor-pointer bg-primary text-black py-2 px-4 rounded-lg hover:bg-primary-dark flex items-center">
                <BsFolderPlus size={20} className="mr-2" />
                <span>Choose Image</span>
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageInputChange(e)}
                className="hidden"
              />
            </div>
            {selectedImage && (
              <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drop or browse your profile picture</p>
                )}
              </div>
            )}
            <button
              onClick={handleCreatePlaylist}
              className="w-full py-2 text-sm bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark focus:outline-none"
              style={{
                transition: 'background-color 0.3s ease',
              }}
            >
              Create Playlist
            </button>
          </div>
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
}
