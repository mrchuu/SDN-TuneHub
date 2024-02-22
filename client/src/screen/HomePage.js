import { useEffect, useRef, useState } from "react";
import DefaultTemplate from "../template/DefaultTemplate";
import SERVER_URL from "../config.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import PerformRequest from "../utilities/PerformRequest.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logOut } from "../redux/auth.js";
import SongList from "../component/SongList.js";
export default function HomePage() {
  const navigate = useNavigate();
  const hasMounted = useRef(false);
  const auth = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const { OriginalRequest } = PerformRequest();
  return (
    <DefaultTemplate>
      <div className="w-full min-h-screen">
        <SongList/>
      </div>
    </DefaultTemplate>
  );
}
