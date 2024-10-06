import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css"; // Import your main CSS file with Tailwind directives
// import Achievements from './components/Achievements'; // Import the Achievements component
import { Routes, Route, Navigate } from "react-router-dom";
// import AboutUs from './components/AboutUs';
// import Carousel from './components/libraryItems';
// import Faculty from './components/Faculty';
// import FacultyDetail from './components/FacultyDetail';
// import Home from './components/HomePage';
// import Navbar from './components/Navbar';
// import Footer from './components/Footerbar'
// import Login from './components/Login'
import Start from "./components/Start";
// import CompetitiveEnglish from './components/CompetitiveEnglish';

// import ImageGallery from './components/ImageGallery';
// import Courses from './components/Courses'

// Admin pages

// import ProfileAdmin from './components/Admin/Profile/Profile'
// import Profile from './components/Admin/Profile/Profile';
import NavbarAdmin from "./components/Admin/Navbar/Navbar";
import SideBarAdmin from "./components/Admin/Sidebar/Sidebar";
// import WelcomePage from "./components/Admin/WelcomePage/WelcomePage";
// import AchievementAdmin from "./components/Admin/Achievements/Achievements";
// // import { Route } from 'react-router-dom';
// import CompetitiveEnglishAdmin from "./components/Admin/CompetitiveEnglish/CompetitiveEnglish";
// import EnggContentAdmin from "./components/Admin/EnggContent/EnggContent";
// import FacultyAdmin from "./components/Admin/Faculty/FacultyCard";
// import FacultyList from "./components/Admin/Faculty/FacultyList";
// import LibraryAdmin from "./components/Admin/Library/Library";
// import PUCContentAdmin from "./components/Admin/PUCContent/PUCContent";
import LoginForm from "./components/Login";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLoginStatus } from "./authSlice";
import AdminRoutes from "./adminRoutes";
import WelcomePage from "./components/Admin/WelcomePage/WelcomePage";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, loggedOut } from "./store/auth/authSlice";
import FacultyDetail from "./components/FacultyDetail";
import Faculty from "./components/Faculty";
import ImageGallery from "./components/ImageGallery";
import FacultyRoutes from "./facultyRoutes";
import Footerbar from "./components/Footerbar";

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

  // useEffect(() => {
  //   dispatch(fetchLoginStatus());
  //   console.log(isLoggedIn);
  //   console.log(user);
  // }, [dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // const [islog, setlog] = useState();

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/api/admin/isLoggedIn",
  //         {
  //           withCredentials: true, // This allows the cookies to be sent
  //         }
  //       );
  //       console.log("Login check response:", response);
  //       setlog(response);
  //     } catch (error) {
  //       console.error("Error during check-login:", error);
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);
  // Empty array ensures it runs only once after component mounts

  return (
    // <div className="App bg-gray-50 min-h-screen p-4">
    //   {/* Main container for the App */}
    //   <Achievements /> {/* Render the Achievements component */}
    // </div>
    <>
      {/* <Navbar/> */}
      {/* <NavbarAdmin/>
      <SideBarAdmin />
    <Routes>
      <Route path="/achivements" element={<Achievements/>}/>
      <Route path="/About-us" element={<AboutUs/>} />
      <Route path="/library" element={<Carousel/>}/>
      <Route path="/faculty/" element={<Faculty/>} />
      <Route path="/faculty-details/:id" element={<FacultyDetail/>} />
      <Route path="/" element={<Home/>} /> */}
      {/* <Route path="navbar" element={<Navbar/>} /> */}
      {/* <Route path="footer" element={<Footer/>} /> */}
      {/* <Route path="start" element={<Start/>} />
      <Route path="login" element={< Login/>} />
      <Route path="competitive-english" element={<CompetitiveEnglish/>} />
      <Route path="gallery" element={<ImageGallery/>} />
      <Route path="courses" element={<Courses/>} />
    </Routes>
    <Footer/>
    </> */}

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
      </Routes>
      <Footerbar />
    </>
  );
};

export default App;
