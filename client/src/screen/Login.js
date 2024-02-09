import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";
import { BsSoundwave } from "react-icons/bs";
import { FormControl, TextField } from "@mui/material";
// import MuiTextField from "@mui/material/TextField";
// import styled from "@emotion/styled";
import SERVER_URL from "../config.js";
import "../style/login.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import PerformRequest from "../utilities/PerformRequest.js";
import { login } from "../redux/auth.js";
export default function Login() {
  const controls = useAnimation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { OriginalRequest } = PerformRequest();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(loginData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await OriginalRequest("auth/login", navigate, "POST", loginData);
      if (data) {
        dispatch(login(data.data));
        navigate("/")
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  //   const CustomTextField = styled(MuiTextField)({
  //     // Your styles here
  //     '& label.Mui-focused': {
  //       color: 'green',
  //     },
  //     '& .MuiOutlinedInput-root': {
  //       '& fieldset': {
  //         borderColor: 'red',
  //       },
  //       '&:hover fieldset': {
  //         borderColor: 'blue',
  //       },
  //       '&.Mui-focused fieldset': {
  //         borderColor: 'green',
  //       },
  //     },
  //   });
  return (
    <div className="w-full h-screen flex">
      <div className="md:w-2/6 w-full bg-primaryBg p-2">
        <motion.div
          onHoverStart={() =>
            controls.start({
              //   scale: 1.2,
              transformOrigin: "left",
              textDecoration: "underline",
            })
          }
          onHoverEnd={() =>
            controls.start({
              //   scale: 1,
              transformOrigin: "left",
              textDecoration: "none",
            })
          }
          animate={controls}
          transition={{ duration: 0.1 }}
        >
          <Link className="flex items-center" to={"/"}>
            <MdOutlineKeyboardBackspace size={30} />
            <p className="text-lg font-semibold text-OrangePrimary">HomePage</p>
          </Link>
        </motion.div>
        <div className="w-4/5 mx-auto">
          <div className={`flex items-center pt-4`}>
            <BsSoundwave color="#ff5e3a" size={50} className="mr-1" />
            <h3 className="text-textSecondary font-bold text-2xl">Tune</h3>
            <h3 className="text-OrangePrimary font-bold text-2xl">Hub</h3>
          </div>
          <h4 className="font-medium text-textSecondary text-2xl pt-4">
            Log in to your account
          </h4>
          <h4 className="text-textSecondary">
            Don't have an account ? Sign up{" "}
            <Link to={"/signup"} className="text-blue-600 underline text-md">
              here
            </Link>
          </h4>
          <form
            style={{ paddingTop: "30px" }}
            className="w-full"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormControl className="w-full gap-6 flex-col">
              <TextField
                required
                label="email address"
                name="email"
                onChange={(e) => {
                  handleChange(e);
                }}
                color="warning"
              />
              <TextField
                required
                type="password"
                label="password"
                name="password"
                onChange={(e) => {
                  handleChange(e);
                }}
                color="warning"
              />
              <button
                className="bg-OrangePrimary rounded-md py-3 shadow-md"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Login
              </button>
            </FormControl>
          </form>
          <h4 className="text-textSecondary pt-2">
            Forgot password ? Reset{" "}
            <Link to={"/"} className="text-blue-600 underline text-md">
              here
            </Link>
          </h4>
          <div className="flex items-center justify-between pt-4">
            <hr className="w-2/5 bg-slate-600" style={{ height: "2px" }} />
            or
            <hr className="w-2/5 bg-slate-600" style={{ height: "2px" }} />
          </div>
          <div className="pt-4">
            <button class="flex w-full justify-center py-3 items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              <svg
                class="h-6 w-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                //   xmlns:xlink="http://www.w3.org/1999/xlink"
                width="800px"
                height="800px"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                {" "}
                <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
                <defs> </defs>{" "}
                <g
                  id="Icons"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  {" "}
                  <g
                    id="Color-"
                    transform="translate(-401.000000, -860.000000)"
                  >
                    {" "}
                    <g
                      id="Google"
                      transform="translate(401.000000, 860.000000)"
                    >
                      {" "}
                      <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1"
                        fill="#FBBC05"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2"
                        fill="#EB4335"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3"
                        fill="#34A853"
                      >
                        {" "}
                      </path>{" "}
                      <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4"
                        fill="#4285F4"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </svg>
              <span className="text-textSecondary">Log in with Google</span>
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-4/6 w-0 bg-cover bg-[url('https://volna.volkovdesign.com/img/home/slide1.jpg')] bg-center">
        <div className="w-full h-screen backdrop-filter backdrop-brightness-50 py-14 px-14">
          <p className="typingText text-OrangePrimary text-4xl font-medium">
            Welcome back {isLoggedIn && auth.first_name + " " + auth.last_name}
          </p>
          <p className="w-3/5 typingText text-neutral-300 text-base font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            quis mauris nunc. Nullam dignissim sapien non augue consequat
            tristique.{" "}
            <span className="underline flex items-center">
              Nullam eget mollis nisl.
              <IoArrowForward />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
