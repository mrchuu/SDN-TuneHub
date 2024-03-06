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
import ArtistProfile from "./screen/ArtistProfile";
import SongDetail from "./screen/SongDetail";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/oauth2Redirect" element={<Oauth2Redirect />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/leaderboard" element={<LeaderBoard/>}/>
        <Route path="/explore" element={<Explore />} />
        <Route path="/artist/dashboard" element={<ArtistDashBoard/>}/>
        <Route path="/artist/upload" element={<ArtistUpload/>}/>
        <Route path="/confirmSignUp/:token" element={<ConfirmSignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/artist/:artistId" element={<ArtistProfile/>}/>
        <Route path="/leaderboard/artist/:artistId" element={<ArtistProfile/>}/>
        <Route path="/leaderboard/songdetail" element={<SongDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
