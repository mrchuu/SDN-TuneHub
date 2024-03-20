import { useEffect, useRef, useState, useCallback } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import SERVER_URL from "../config.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PerformRequest from "../utilities/PerformRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logOut, setUserInfo } from "../redux/auth.js";
import "../style/userprofile.css"
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import Modal from "react-modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormControl, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import SongList from "../component/SongList.js";
export default function UserProfile() {

    const navigate = useNavigate();
    const hasMounted = useRef(false);
    const auth = useSelector((state) => state.auth.userInfo);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const { OriginalRequest } = PerformRequest();
    const [editProfile, setEditProfile] = useState({
        id: auth._id,
        firstName: auth.first_name,
        lastName: auth.last_name,
        introduction: auth.introduction,
        profilePicture: auth.profile_picture
    });
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
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setEditProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        const updateEditProfile = { ...editProfile };
        updateEditProfile.profilePicture = imageSrc;
        try {
            const data = await OriginalRequest(
                `user/edit-profile`,
                "PUT",
                updateEditProfile
            );
            // console.log("Data here: "+data);
            if (data.data) {
                dispatch(setUserInfo(data.data));
            }
            setIsOpen0(false);
        } catch (error) {
            console.log(error);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen0, setIsOpen0] = useState(false);



    const [changePassword, setChangePassword] = useState({
        id: auth._id,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChangePassword({
            ...changePassword,
            [name]: value,
        });
        if (name === "confirmPassword") {
            setPasswordMatch(changePassword.newPassword === value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (changePassword.newPassword !== changePassword.confirmPassword) {
            toast.error("The new password does not match the password validation.");
        } else {
            try {
                OriginalRequest("user/change-password", "PUT", changePassword);
                setIsOpen(false);
            } catch (error) {
                console.error("Failed to change password:", error);
            }
        }
    };

    function openPopup() {
        setIsOpen(true);
    }

    function closePopup() {
        setIsOpen(false);
    }
    const openPopup0 = () => {
        setIsOpen0(true);
    };

    const closePopup0 = () => {
        setIsOpen0(false);
    };
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [artistFollowed, setArtistFollowed] = useState([]);
    const [playList, setPlayList] = useState([]);
    const fetchArtistFollowed = async () => {
        const data = await OriginalRequest(`user/artistFollowed/${auth._id}`, "GET");
        if (data) {
            setArtistFollowed(data.data);
        }
    }
    const fetchPlayList = async () => {
        const data = await OriginalRequest(`user/listPlayList/${auth._id}`, "GET");
        if (data) {
            setPlayList(data.data);
        }
    }
    console.log(playList);
    useEffect(() => {
        fetchArtistFollowed();
        fetchPlayList();
    }, []);
    return (
        <DefaultTemplate>
            <div className="w-full min-h-screen">
                <div className="profile-contain pb-5">
                    <div className="profile-header bg-light30 dark:bg-dark30">

                        <div className="profile-info">
                            <div className="picture">
                                <img className="object-cover object-center" src={auth.profile_picture} alt="Girl in a jacket" />
                            </div>
                            <div className="info-user text-lightText dark:text-darkText">
                                <p>Profile</p>
                                {/* <h1>David Robin</h1> */}
                                <h1>{auth.first_name} {auth.last_name}</h1>
                                <p id="introduce" className="text-lightTextSecondary dark:text-darkTextSecondary">Introduce: {auth.introduction}</p>
                                <p id="number-playlist">1 Public Playlist</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-content">
                        <div className="edit-button">
                            <div className="flex items-center">
                                <button className="flex items-center px-6 py-2 mr-4 text-white bg-light10 rounded-full" onClick={openPopup0}><FaPen className="mr-2" /><span>Edit</span></button>
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
                                                value={changePassword.currentPassword}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-orange-500"
                                                placeholder="Current Password"
                                            />
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={changePassword.newPassword}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-orange-500"
                                                placeholder="New Password"
                                            />
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={changePassword.confirmPassword}
                                                onChange={handleChange}
                                                className={`block w-full px-4 py-2 border border-gray-300 rounded mb-4 focus:outline-none ${passwordMatch ? 'focus:border-orange-500' : 'focus:border-red-500'}`}
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
                                <Modal
                                    isOpen={isOpen0}
                                    onRequestClose={closePopup0}
                                    contentLabel="Edit Profile"
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 p-8"
                                >
                                    <form
                                        style={{ paddingTop: "10px" }}
                                        className="w-full"
                                        encType="multipart/form-data"
                                        onSubmit={(e) => {
                                            handleSubmit1(e);
                                        }}
                                    >
                                        <Box sx={style}>
                                            <h4 className="font-medium text-lightText text-2xl pb-6 text-center">
                                                Edit profile
                                            </h4>
                                            <img
                                                src={imageSrc}
                                                className="w-20 h-20 rounded-full mx-auto mb-5 object-cover object-center"
                                            />
                                            <FormControl className="w-full gap-2 flex-col">
                                                <div className="flex items-center justify-between">
                                                    <TextField
                                                        required
                                                        label="First name"
                                                        name="firstName"
                                                        value={editProfile.firstName}
                                                        color="warning"
                                                        onChange={(e) => {
                                                            handleDataChange(e);
                                                        }}
                                                    />
                                                    <div className="w-5"></div>
                                                    <TextField
                                                        required
                                                        label="Last name"
                                                        name="lastName"
                                                        value={editProfile.lastName}
                                                        color="warning"
                                                        onChange={(e) => {
                                                            handleDataChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <TextField
                                                    label="Introduce yourself"
                                                    name="introduction"
                                                    value={editProfile.introduction}
                                                    color="warning"
                                                    multiline
                                                    rows={2}
                                                    onChange={(e) => {
                                                        handleDataChange(e);
                                                    }}
                                                />
                                                <div {...getRootProps()} style={dropzoneStyle}>
                                                    <input {...getInputProps()} />
                                                    {isDragActive ? (
                                                        <p>Drop the files here ...</p>
                                                    ) : (
                                                        <p>Drop or browse your profile picture</p>
                                                    )}
                                                </div>
                                                <Button
                                                    type="submit"
                                                    className="w-full bg-light10 text-white py-2 px-4 rounded-full hover:bg-orange-500 hover:text-lightText transition duration-300 mb-2"
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-400 transition duration-300"
                                                    onClick={closePopup0}
                                                >
                                                    Cancel
                                                </Button>
                                            </FormControl>
                                        </Box>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                        <div className="px-5">
                            <h1 className="text-2xl font-semibold dark:text-darkText">Recent song</h1>
                            <SongList url={`songs/recentSong/`} />
                        </div>
                        {artistFollowed.length != 0 ? (
                            <div className="mt-8">
                                <div className="mx-auto">
                                    <h2 className="text-2xl font-semibold mb-5 dark:text-white ml-4">
                                        Artist Followed
                                    </h2>
                                </div>
                                <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary">

                                    {artistFollowed.map((art, index) => (
                                        
                    
                                            <div className="card p-4 ml-4 mr-5 border rounded-md bg-light60 dark:bg-dark60 relative shadow-md hover:shadow-neutral-400 hover:bg-light30  dark:hover:shadow-blue-500/50 dark:hover:bg-dark30 dark:shadow-md dark:border-none mb-8">
                                                <img
                                                    src={art.profile_picture}
                                                    className="rounded-full w-40 h-40 object-cover object-center"
                                                />
                                                <Link key={index} to={`/artist/${art._id}`} className="text-xs hover:underline">
                                                <h3 id="h3-card" className="text-lg text-lightText font-semibold dark:text-white m-2 w-40 overflow-hidden line-clamp-1">
                                                    {art.artist_name}
                                                </h3>
                                                </Link>
                                                {art.introduction ? (
                                                    <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2 w-40 h-12 overflow-hidden line-clamp-2">
                                                        {art.introduction}
                                                    </p>
                                                ) : (
                                                    <p className="text-md text-light30 dark:text-dark30 ml-2">
                                                        Null
                                                    </p>
                                                )}

                                            </div>
                                        
                                    ))}
                                </div>
                            </div>
                        ) : (<></>)}
                        {playList.length != 0 ? (
                            <div className="mt-5 ml-6">
                                <div className="mx-auto ">
                                    <h2 className="text-2xl font-semibold mb-5 dark:text-white ml-0">
                                        Playlist
                                    </h2>
                                </div>
                                <div className="mx-auto flex flex-wrap items-center text-lightTextSecondary dark:text-darkTextSecondary">

                                    {playList.map((ply, index) => (
                                        
                                            <div className="card p-4 border rounded-md bg-light60 dark:bg-dark60 relative shadow-md hover:shadow-neutral-400 hover:bg-light30  dark:hover:shadow-blue-500/50 dark:hover:bg-dark30 dark:shadow-md dark:border-none mb-8">
                                                <img
                                                    src={ply.play_list_cover}
                                                    className="rounded-md w-40 h-40 object-cover object-center"
                                                />
                                                <Link key={index} to={`/playlist/${ply._id}`} className="text-xs hover:underline">
                                                <h3 id="h3-card" className="text-lg text-lightText font-semibold dark:text-white m-2 w-40 overflow-hidden line-clamp-1">
                                                    {ply.play_list_name}
                                                </h3>
                                                </Link>
                                                {ply.createdAt ? (
                                                    <p className="text-md text-lightTextSecondary dark:text-darkTextSecondary ml-2 w-40 h-12 overflow-hidden line-clamp-2">
                                                        Date created: <br />{ply.createdAt}
                                                    </p>
                                                ) : (
                                                    <p className="text-md text-light30 dark:text-dark30 ml-2">
                                                        Null
                                                    </p>
                                                )}

                                            </div>
                                    ))}
                                </div>
                            </div>
                        ) : (<></>)}


                    </div>
                </div>
            </div>
        </DefaultTemplate>
    );
}
