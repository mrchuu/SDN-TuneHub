import { Link } from "react-router-dom";
import { FaCogs } from "react-icons/fa";
import { useSelector } from "react-redux";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import Logout from "../utilities/LogOut.js";
export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [anchorProfile, setAnchorProfile] = useState(null);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const openMenu = (e) => {
    setOpenProfileMenu(true);
    setAnchorProfile(e.currentTarget);
  };
  const closeMenu = (e) => {
    setOpenProfileMenu(false);
    setAnchorProfile(null);
  };
  const { performLogOut } = Logout();
  return (
    <div className="flex items-center justify-end pt-5">
      {/* <FaCogs size={35} className="mr-8" color="#f2785c" /> */}
      <ThemeSwitcher />
      <IoIosNotifications className="text-light10 ml-5" size={28} />
      <div>
        {isLoggedIn ? (
          <div className="mr-10 ml-5">
            <img
              src={userInfo.profile_picture}
              className="w-14 rounded-full border-orange-200 dark:bg-dark10 shadow-lg border-2"
              onClick={(e) => {
                openMenu(e);
              }}
            />
            <Menu
              className="mt-3"
              open={openProfileMenu}
              anchorEl={anchorProfile}
              onClose={closeMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              autoFocus={false}
            >
              <MenuItem>
                <Link to={"/profile"} className="flex items-center">
                  <ListItemIcon>
                    <FaCircleUser />
                  </ListItemIcon>
                  <ListItemText>Your profile</ListItemText>
                </Link>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={(e) => {
                  performLogOut(e);
                }}
              >
                <ListItemIcon>
                  <IoLogOut />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to={"/login"} className="mr-10 ml-5">
            <button className="bg-light10 dark:bg-dark10 px-6 py-2 rounded-full text-textSecondary text-md hover:text-white">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
