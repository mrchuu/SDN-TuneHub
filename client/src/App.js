import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./screen/HomePage";
import Login from "./screen/Login";
import ConfirmSignUp from "./screen/ConfirmSignUp";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmSignUp/:token" element={<ConfirmSignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
