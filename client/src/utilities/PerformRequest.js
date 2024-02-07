import SERVER_URL from "../config.js";
import toast from "react-hot-toast";
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
    return data;
  } else {
    if (response.status === 401) {
      return RefreshToken(url, navigate, method, body);
    } else {
      console.log(data.error);
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
    if (response.status === 401) {
      console.log(data.error);
      toast.error("Token expired, Please login again");
      navigate("/login");
    } else {
      console.log(data.error);
    }
  }
};

export default {
  OriginalRequest,
};
