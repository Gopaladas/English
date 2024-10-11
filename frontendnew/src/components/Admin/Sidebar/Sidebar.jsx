import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import profilePic from "../../../assets/vijaykumar.jpg";
// import Profile from '../Profile/Profile'
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// const handlenavigate = () => {
//   Navigate("/userMain/profileupdate");
// };
// Optional: You can create a separate ProfileName component if needed
const ProfileName = ({ user }) => (
  <div className="additional-profile">
    <h4>{user?.name || user?.username}</h4>
    <p>{user?.designation}</p>
    <p>
      <b style={{ color: "black" }}>Email:</b>
      {user?.email}
    </p>
    <Link
      to={
        user?.role === "admin"
          ? "/adminMain/profileupdate"
          : "/userMain/profileupdate"
      }
      className="h-[70px] w-[120px] bg-black text-white rounded ml-[10px]"
    >
      UpdateProfile
    </Link>
    <Link
      to={user?.role === "admin" ? "/adminMain/info" : "/userMain/info"}
      className="h-[70px] w-[120px] bg-white text-black rounded ml-[10px] "
    >
      moreinfo
    </Link>
  </div>
);

const Sidebar = ({ setActiveSection }) => {
  const { isLoggedIn, user, isloading } = useSelector((state) => state.auth);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDeptOpen, setDeptOpen] = useState(false);
  const [isPUCOpen, setPUCOpen] = useState(false);
  const [isEnggOpen, setEnggOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Faculty");
  const [admin, setAdmin] = useState();

  // useEffect(() => {
  //   const getAdminData = async () => {
  //     try {
  //       const adminresponse = await axios.get(
  //         "http://localhost:3000/api/admin/admindata"
  //       );
  //       console.log("hey", adminresponse);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getAdminData();
  // }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDeptDropdown = () => {
    setDeptOpen(!isDeptOpen);
  };

  const togglePUCDropdown = () => {
    setPUCOpen(!isPUCOpen);
  };

  const toggleEnggDropdown = () => {
    setEnggOpen(!isEnggOpen);
  };

  const handleSectionClick = (section) => {
    setActiveItem(section);
    // setActiveSection(section);
    // Close all dropdowns except for the active path
    if (!section.startsWith("PUC") && !section.startsWith("Engg")) {
      setDeptOpen(false);
      setPUCOpen(false);
      setEnggOpen(false);
    }
  };

  const handleProfileClick = () => {
    setProfileOpen(!isProfileOpen);
  };

  console.log(user);
  return (
    <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <div className="sidebar-content">
        <div className="profile-section" onClick={handleProfileClick}>
          <img
            src={user?.imageUrl}
            alt={user?.username || user?.name}
            className="profile-pic"
          />
          <h3 className="profile-name">
            {(user?.role === "admin" && user?.name) || user?.username}
          </h3>
          {<ProfileName user={user} />}
        </div>
        <hr />
        <ul className="sidebar-list">
          <li
            onClick={() => handleSectionClick("Faculty")}
            className={activeItem === "Faculty" ? "active" : ""}
          >
            <Link
              to={
                user?.role === "admin"
                  ? "/adminMain/FacultyList"
                  : "/userMain/FacultyList"
              }
            >
              Faculty List
            </Link>
          </li>
          <li
            onClick={toggleDeptDropdown}
            className={activeItem.startsWith("Department") ? "active" : ""}
          >
            Department Courses
            <span className="dropdown-icon">{isDeptOpen ? "▲" : "▼"}</span>
          </li>
          {isDeptOpen && (
            <ul className="nested-dropdown">
              <li
                onClick={togglePUCDropdown}
                className={activeItem.startsWith("PUC") ? "active" : ""}
              >
                <Link>PUC</Link>
                <span className="dropdown-icon">{isPUCOpen ? "▲" : "▼"}</span>
              </li>
              {isPUCOpen && (
                <ul className="nested-dropdown">
                  <li
                    onClick={() => handleSectionClick("PUC-P1")}
                    className={activeItem === "PUC-P1" ? "active" : ""}
                  >
                    <Link
                      to={{
                        pathname: `${
                          user.role === "admin"
                            ? "/adminMain/Courses"
                            : "/userMain/Courses"
                        }`,
                        search: `?year=P1`,
                      }}
                    >
                      P1
                    </Link>
                  </li>
                  <li
                    onClick={() => handleSectionClick("PUC-P2")}
                    className={activeItem === "PUC-P2" ? "active" : ""}
                  >
                    <Link
                      to={{
                        pathname: `${
                          user.role === "admin"
                            ? "/adminMain/Courses"
                            : "/userMain/Courses"
                        }`,
                        search: `?year=P2`,
                      }}
                    >
                      P2
                    </Link>
                  </li>
                </ul>
              )}
              <li
                onClick={toggleEnggDropdown}
                className={activeItem.startsWith("Engg") ? "active" : ""}
              >
                <Link to={"/EnggContentAdmin"}>Engineering</Link>
                <span className="dropdown-icon">{isEnggOpen ? "▲" : "▼"}</span>
              </li>
              {isEnggOpen && (
                <ul className="nested-dropdown">
                  <li
                    onClick={() => handleSectionClick("Engg-E1")}
                    className={activeItem === "Engg-E1" ? "active" : ""}
                  >
                    <Link
                      to={{
                        pathname: `${
                          user.role === "admin"
                            ? "/adminMain/Courses"
                            : "/userMain/Courses"
                        }`,
                        search: `?year=E1`,
                      }}
                    >
                      E1
                    </Link>
                  </li>
                  <li
                    onClick={() => handleSectionClick("Engg-E2")}
                    className={activeItem === "Engg-E2" ? "active" : ""}
                  >
                    <Link
                      to={{
                        pathname: `${
                          user.role === "admin"
                            ? "/adminMain/Courses"
                            : "/userMain/Courses"
                        }`,
                        search: `?year=E2`,
                      }}
                    >
                      E2
                    </Link>
                  </li>
                  <li
                    onClick={() => handleSectionClick("Engg-E3")}
                    className={activeItem === "Engg-E3" ? "active" : ""}
                  >
                    <Link
                      to={{
                        pathname: `${
                          user.role === "admin"
                            ? "/adminMain/Courses"
                            : "/userMain/Courses"
                        }`,
                        search: `?year=E3`,
                      }}
                    >
                      E3
                    </Link>
                  </li>
                  <li
                    onClick={() => handleSectionClick("Engg-E4")}
                    className={activeItem === "Engg-E4" ? "active" : ""}
                  >
                    <Link
                      to={{
                        pathname: `${
                          user.role === "admin"
                            ? "/adminMain/Courses"
                            : "/userMain/Courses"
                        }`,
                        search: `?year=E4`,
                      }}
                    >
                      E4
                    </Link>
                  </li>
                </ul>
              )}
            </ul>
          )}

          {user?.role === "admin" && (
            <li
              onClick={() => handleSectionClick("AddCourse")}
              className={activeItem === "AddCourse" ? "active" : ""}
            >
              <Link to={"/adminMain/createCourse"} className="clr">
                Add Course
              </Link>
            </li>
          )}

          <li
            onClick={() => handleSectionClick("Achievements")}
            className={activeItem === "Achievements" ? "active" : ""}
          >
            <Link to={"/achivements"} className="clr">
              Achievements
            </Link>
          </li>
          <li
            onClick={() => handleSectionClick("Library")}
            className={activeItem === "Library" ? "active" : ""}
          >
            <Link
              to={
                user?.role === "admin"
                  ? "/adminMain/Library"
                  : "/userMain/Library"
              }
            >
              Library
            </Link>
          </li>
          <li
            onClick={() => handleSectionClick("English")}
            className={activeItem === "English" ? "active" : ""}
          >
            <Link to={"/english"}>Competitive English</Link>
          </li>
          <li
            onClick={() => handleSectionClick("Gallery")}
            className={activeItem === "Gallery" ? "active" : ""}
          >
            <Link to={"/gallery"}>Gallery</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
