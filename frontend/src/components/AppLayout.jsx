import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import HomePage from "./home/HomePage.jsx";
import WorkingPage from "./working/WorkingPage.jsx";
import FeaturesPage from "./features/FeaturesPage.jsx";
import SignupPage from "./signUp/SignUpPage.jsx";
import AboutPage from "./about/AboutPage.jsx";
import LoginPage from "./login/LoginPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./profile/Profile.jsx";

function AppLayout() {
  const location = useLocation();
  const background = location.state?.backgroundLocation || location;

  // Check if we are currently showing a modal OVER a background
  const isDisplayingModal = !!location.state?.backgroundLocation;
  return (
    <div className="app-layout">
      {/* We always keep 'content-blur' as a flex container. 
         We only add the actual 'blur' filter via CSS when isDisplayingModal is true.
      */}
      <div className={`content-blur ${isDisplayingModal ? "active-blur" : ""}`}>
        <Navbar />
        <main className="main-content">
          <Routes location={background}>
            <Route path="/" element={<HomePage />} />
            <Route path="/working" element={<WorkingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <ToastContainer />
        </main>
        {/* Keep the footer rendered so the page height doesn't collapse */}
        <Footer />
      </div>

      {isDisplayingModal && (
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </div>
  );
}

export default AppLayout;
