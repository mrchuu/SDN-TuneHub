import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screen/HomePage";
import Login from "./screen/Login";
import ConfirmSignUp from "./screen/ConfirmSignUp";
import { Toaster } from "react-hot-toast";
import SignUp from "./screen/SignUp";
import Oauth2Redirect from "./screen/Oauth2Redirect";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/oauth2Redirect" element={<Oauth2Redirect />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/confirmSignUp/:token" element={<ConfirmSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
