import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css"; // Import your main CSS file with Tailwind directives
import { Routes, Route, Navigate } from "react-router-dom";

import Start from "./components/Start";

import NavbarAdmin from "./components/Admin/Navbar/Navbar";
import SideBarAdmin from "./components/Admin/Sidebar/Sidebar";

import LoginForm from "./components/Login";
import axios from "axios";

import AdminRoutes from "./adminRoutes";
import WelcomePage from "./components/Admin/WelcomePage/WelcomePage";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, loggedOut } from "./store/auth/authSlice";
import FacultyDetail from "./components/FacultyDetail";
import Faculty from "./components/Faculty";
import ImageGallery from "./components/ImageGallery";
import FacultyRoutes from "./facultyRoutes";
import Footerbar from "./components/Footerbar";
import ViewAll from "./components/Admin/Gallery/viewAll";
import AchievementsUpload from "./components/Admin/Achievements/Achievements";
import CEUpload from "./components/Admin/CompetitiveEnglish/CompetitiveEnglish";

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("the user is LoggedIn", user?.role);
    } else {
      console.log("the user is loggedOut");
    }
  }, [isLoggedIn, user]);

  return (
    <>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/loginform" element={<LoginForm />} />
        {user?.role === "admin" ? (
          <Route
            path="/adminMain/*"
            element={
              <div className="adminpage">
                <div className="left">
                  <SideBarAdmin />
                </div>
                <div className="right">
                  <AdminRoutes />
                </div>
              </div>
            }
          />
        ) : (
          <Route
            path="/userMain/*"
            element={
              <div className="adminpage">
                <div className="left">
                  <SideBarAdmin />
                </div>
                <div className="right">
                  <FacultyRoutes />
                </div>
              </div>
            }
          />
        )}

        <Route path="/info/:id" element={<FacultyDetail />} />

        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/gallery/viewAll/:id" element={<ViewAll />} />
        <Route path="/achivements" element={<AchievementsUpload />} />
        <Route path="/english" element={<CEUpload />} />
      </Routes>
      <Footerbar />
    </>
  );
};

export default App;
