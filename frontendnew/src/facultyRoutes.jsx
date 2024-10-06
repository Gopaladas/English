import React from "react";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./components/Admin/WelcomePage/WelcomePage";
// import FacultyDetail from "./components/FacultyDetail";
import FacultyList from "./components/Admin/Faculty/FacultyList";
// import AboutUs from "./components/Admin/Card/AboutUs";
import Bookimgstudent from "./components/Admin/Card/Bookimgstudent";
import Bookstudent from "./components/Admin/Card/Bookstudent";
import FacultyUpdateForm from "./components/Updateprofile";
import FacultyDetail from "./components/FacultyDetail";

const FacultyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/FacultyList" element={<FacultyList />} />
        <Route path="/Courses" element={<Bookstudent />} />
        <Route path="/Courses/BookdDtails/:id" element={<Bookimgstudent />} />
        <Route path="/profileupdate" element={<FacultyUpdateForm />} />
        <Route path="/info" element={<FacultyDetail />} />
      </Routes>
    </>
  );
};

export default FacultyRoutes;
