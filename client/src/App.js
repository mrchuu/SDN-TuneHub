import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screen/HomePage";
import Login from "./screen/Login";
import ConfirmSignUp from "./screen/ConfirmSignUp";
import LeaderBoard from "./screen/LeaderBoard";
import { Toaster } from "react-hot-toast";
import SignUp from "./screen/SignUp";
import Explore from "./screen/Explore";
import Oauth2Redirect from "./screen/Oauth2Redirect";
import UserProfile from "./screen/UserProfile";
import ForgotPassword from "./screen/ForgotPassword";
import ArtistDashBoard from "./screen/ArtistDashBoard";
import ArtistUpload from "./screen/ArtistUpload";
import ArtistFollower from "./screen/ArtisFollower";
import PlaylistScreen from "./screen/PlaylistScreen";
import ArtistProfile from "./screen/ArtistProfile";
import SongDetail from "./screen/SongDetail";
import DetailAlbum from "./screen/DetailAlbum";
import Player from "./component/Player";
import { useEffect } from "react";
import PaymentResult from "./screen/PaymentResult";
import PurchaseSong from "./screen/PurchaseSong";
import SongListExpand from "./screen/SongListExpand";
import CommentPopup from "./component/PopupComments";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <Routes>
        {/* <Route path="/oauth2Redirect" element={<Oauth2Redirect />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/artist/dashboard" element={<ArtistDashBoard />} />
        <Route path="/artist/follower" element={<ArtistFollower />} />
        <Route path="/artist/upload" element={<ArtistUpload />} />
        <Route path="/confirmSignUp/:token" element={<ConfirmSignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/songdetail/:songId" element={<SongDetail />} />
        <Route path="/playlist" element={<PlaylistScreen />} />
        <Route path="/album/:id/:artistId" element={<DetailAlbum />} />
        <Route path="/playlist/:playlistId" element={<PlaylistScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/artist/:artistId" element={<ArtistProfile />} />
        <Route
          path="/payment/result/:status/:message"
          element={<PaymentResult />}
        />
        <Route path="/payment/purchase/:songId" element={<PurchaseSong />} />
        <Route path="/songList/:url/:title" element={<SongListExpand />} />
        <Route path="/popupcoments" element={<CommentPopup />} />
      </Routes>
      {["/login", "/signup", "/forgot-password"].includes(
        window.location.pathname
      ) ? (
        <></>
      ) : (
        <Player />
      )}
    </BrowserRouter>
  );
}

export default App;
