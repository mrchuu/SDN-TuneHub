import { useEffect, useRef, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import SERVER_URL from "../config.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PerformRequest from "../utilities/PerformRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logOut } from "../redux/auth.js";
import "../style/userprofile.css"
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import Modal from 'react-modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
export default function UserProfile() {

    const navigate = useNavigate();
    const hasMounted = useRef(false);
    const auth = useSelector((state) => state.auth.userInfo);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const { OriginalRequest } = PerformRequest();
    // useEffect(() => {
    //   const fetchData = async () => {
    //     if (hasMounted.current) {
    //       const result = await OriginalRequest("auth/user", navigate, "GET");
    //       if (result) {
    //         dispatch(login(result));
    //         console.log(result);
    //       }
    //     } else {
    //       hasMounted.current = true;
    //     }
    //   };
    //   fetchData();
    // }, [hasMounted]);
    //troi dat dung hoa
    // const [isPlaying, setIsPlaying] = useState(false);

    // const handleProgress = (progress) => {
    //   if (progress.playedSeconds >= 30) {
    //     // Pause the player and set the playback time to 30 seconds
    //     playerRef.current.seekTo(30);
    //     setIsPlaying(false);
    //   }
    //   console.log(progress);
    // };

    // const handlePlay = () => {
    //   setIsPlaying(true);
    // };
    const playlists = [
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT03G8Fx0iQ7RQPJchmg-vNXjMKQRvjCDNgAg&usqp=CAU',
            name_song: 'Song 1',
            description: 'Description of song 1'
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQye5YwUHpIbEfCwALijl1Ly4H5UpYYf_h7Uw&usqp=CAU',
            name_song: 'Song 2',
            description: 'Description of song 2'
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Apu1JPEhQk5HgxHA4jqlmFMVPVfl6ji1RQ&usqp=CAU',
            name_song: 'Song 3',
            description: 'Description of song 3'
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT03G8Fx0iQ7RQPJchmg-vNXjMKQRvjCDNgAg&usqp=CAU',
            name_song: 'Song 4',
            description: 'Description of song 4'
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Apu1JPEhQk5HgxHA4jqlmFMVPVfl6ji1RQ&usqp=CAU',
            name_song: 'Song 5',
            description: 'Description of song 5'
        }
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'confirmPassword') {
            setPasswordMatch(formData.newPassword === value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword === formData.confirmPassword) {
            console.log('Mật khẩu mới và xác nhận mật khẩu khớp nhau.');
        } else {
            console.log('Mật khẩu mới và xác nhận mật khẩu không khớp nhau.');
        }
    };
    function openPopup() {
        setIsOpen(true);
    }

    function closePopup() {
        setIsOpen(false);
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <DefaultTemplate>
            <div className="w-full min-h-screen">
                <div className="profile-contain">
                    <div className="profile-header bg-light30">
                        <div className="profile-back">
                            <Link className="flex items-center" to={"/"}>
                                <MdOutlineKeyboardBackspace size={30} />
                                <p className="text-lg font-semibold text-light10">HomePage</p>
                            </Link>
                        </div>
                        <div className="profile-info">
                            <div className="picture">
                                <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="Girl in a jacket" />
                            </div>
                            <div className="info-user text-lightText dark:text-darkText">
                                <p>Profile</p>
                                {/* <h1>David Robin</h1> */}
                                <h1>{auth.first_name} { auth.last_name}</h1>
                                <p id="introduce" className="text-lightTextSecondary dark:text-darkTextSecondary">Introduce: David Robin, often simply referred to as Ronaldo, is one of the most renowned footballers of all time. Born on February 5, 1985, in Funchal, Madeira, Portugal, Ronaldo has achieved legendary.</p>
                                <p id="number-playlist">1 Public Playlist</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-content">
                        <div className="edit-button">
                            <div className="flex items-center">
                                <button className="flex items-center px-6 py-2 mr-4 text-white bg-light10 rounded-full"><FaPen className="mr-2" /><span>Edit</span></button>
                                <button className="flex items-center bg-light10 text-white py-2 px-4 rounded-full" onClick={openPopup}><RiLockPasswordFill className="mr-2" /><span>Change Password</span></button>
                                <Modal
                                    isOpen={isOpen}
                                    onRequestClose={closePopup}
                                    contentLabel="Change Password"
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 p-8"
                                >
                                    <form onSubmit={handleSubmit}>
                                        <Box sx={style}>
                                            <h2 className="text-center text-2xl font-bold mb-6">Change Password</h2>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-indigo-500"
                                                placeholder="Current Password"
                                            />
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-indigo-500"
                                                placeholder="New Password"
                                            />
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`block w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none ${passwordMatch ? 'focus:border-indigo-500' : 'focus:border-red-500'}`}
                                                placeholder="Confirm New Password"
                                            />
                                            {!passwordMatch && <p className="text-red-500 mb-4">Mật khẩu mới không khớp.</p>}
                                            <Button
                                                type="submit"
                                                className="w-full bg-light10 text-white py-2 px-4 rounded-full hover:bg-orange-500 hover:text-lightText transition duration-300 mb-2"
                                            >
                                                Change Password
                                            </Button>
                                            <Button
                                                className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-400 transition duration-300"
                                                onClick={closePopup}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        
                        <div className="px-4 mt-1">
                            <h2 className="text-2xl font-bold mb-4">Public Playlists</h2>
                            <div className="flex flex-wrap justify-between px-4 space-x-4">
                                {playlists.map((playlist, index) => (
                                    <div className="playlist-item w-1/6 p-4 bg-gray-100 rounded-lg" key={index}>
                                        <img src={playlist.image} alt={playlist.name_song} className="playlist-image w-full h-auto rounded-lg" />
                                        <div className="playlist-details mt-4">
                                            <h3 className="playlist-name text-lg font-semibold">{playlist.name_song}</h3>
                                            <p className="playlist-description text-sm mt-2">{playlist.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </DefaultTemplate>
    );
}
