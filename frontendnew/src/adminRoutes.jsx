import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavbarAdmin from "./components/Admin/Navbar/Navbar";
import SideBarAdmin from "./components/Admin/Sidebar/Sidebar";
import WelcomePage from "./components/Admin/WelcomePage/WelcomePage";
import AchievementAdmin from "./components/Admin/Achievements/Achievements";
// import { Route } from 'react-router-dom';
import CompetitiveEnglishAdmin from "./components/Admin/CompetitiveEnglish/CompetitiveEnglish";
import EnggContentAdmin from "./components/Admin/EnggContent/EnggContent";
import FacultyAdmin from "./components/Admin/Faculty/FacultyCard";
import FacultyList from "./components/Admin/Faculty/FacultyList";
import LibraryAdmin from "./components/Admin/Library/Library";
import PUCContentAdmin from "./components/Admin/PUCContent/PUCContent";
import LoginForm from "./components/Login";
import Upload from "./components/Admin/Gallery/Gallery";
import Courses from "./components/Courses";
import FacultyUpdateForm from "./components/Updateprofile";
import Bookstudent from "./components/Admin/Card/Bookstudent";
import Bookimgstudent from "./components/Admin/Card/Bookimgstudent";
import FacultyDetail from "./components/FacultyDetail";
import Library from "./components/Admin/Library/Library";

const AdminRoutes = () => {
  return (
    <>
      {/* <NavbarAdmin /> */}

      <Routes>
        {/* <Route path="/" element={<LoginForm />} /> */}

        <Route path="/" element={<WelcomePage />} />
        <Route path="/achievemtsAdmin" element={<AchievementAdmin />} />
        <Route
          path="/CompetitiveEnglishAdmin"
          element={<CompetitiveEnglishAdmin />}
        />
        <Route path="/EnggContentAdmin" element={<EnggContentAdmin />} />
        <Route path="/FacultyAdmin" element={<FacultyAdmin />} />
        {/* <Route path="/FacultyList" element={<FacultyList />} /> */}
        <Route path="/FacultyList" element={<FacultyList />} />
        <Route path="/LibraryAdmin" element={<LibraryAdmin />} />
        <Route path="/PUCContentAdmin" element={<PUCContentAdmin />} />
        <Route path="/loginform" element={<LoginForm />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route path="/uploadImage" element={<Upload />} />
        <Route path="/uploadImage/:id" element={<Upload />} />
        <Route path="/createCourse" element={<Courses />} />
        <Route path="/profileupdate" element={<FacultyUpdateForm />} />
        <Route path="/Courses" element={<Bookstudent />} />
        <Route path="/Courses/BookdDtails/:id" element={<Bookimgstudent />} />
        <Route path="/info" element={<FacultyDetail />} />
        <Route path="/Library" element={<Library />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
