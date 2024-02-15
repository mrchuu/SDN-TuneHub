import SERVER_URL from "../config.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth.js";

export default function PerformRequest() {
  const dispatch = useDispatch();
  //TODO: use navigate doesn't need to be passed as a parameter 
  const OriginalRequest = async (url, navigate, method, body) => {
    const requestOption = {
      method: String(method),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) {
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
        return RefreshToken(url, navigate, method, body);
      } else {
        //similiar to success toast, but the attribute must be named error
        toast.error(data.error);
      }
    }
  };

  const RefreshToken = async (url, navigate, method, body) => {
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
      return await OriginalRequest(url, navigate, method, body);
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
