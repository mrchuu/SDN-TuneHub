import SERVER_URL from "../config.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth.js";
import { useNavigate } from "react-router-dom";

export default function PerformRequest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //TODO: use navigate doesn't need to be passed as a parameter
  const OriginalRequest = async (url, method, body) => {
    const requestOption = {
      method: String(method),
      credentials: "include",
      headers: {},
    };
    if (body instanceof FormData) {
      requestOption.body = body;
    } else if (body) {
      requestOption.headers["Content-Type"] = "application/json";
      requestOption.body = JSON.stringify(body);
    }
    const response = await fetch(`${SERVER_URL}${url}`, requestOption);
    const data = await response.json();
    if (response.ok) {
      console.log(response.status);
      //if the response have a message, then toast it
      //the attribute must be named message
      if (data.message) {
        toast.success(data.message);
      }
      return data;
    } else {
      if (response.status === 401) {
        //calls to refresh token if the accessToken is expired
        return RefreshToken(url, method, body);
      } else {
        //similiar to success toast, but the attribute must be named error
        toast.error(data.error);
      }
    }
  };

  const RefreshToken = async (url, method, body) => {
    const response = await fetch(`${SERVER_URL}auth/refreshToken`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      // Return the result of OriginalRequest after refreshing the token
      return await OriginalRequest(url, method, body);
    } else {
      //clear cookie, localStorage, redirect to login and toast error
      //if the request is made while there is no refreshToken
      if (response.status === 401) {
        console.log(data.error);
        dispatch(logOut());
        toast.error("Please login");
        navigate("/login");
      } else {
        console.log(data.error);
      }
    }
  };
  return { OriginalRequest };
}