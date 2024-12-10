import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../../../assets/logoHUB.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../../../store/auth/authSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // Handle logout logic
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/adminlogout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Logout response:", response);
      dispatch(loggedOut()); // Update the Redux state to reflect the user logged out
      navigate("/"); // Redirect to login form after logging out
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  // Listen to changes in isLoggedIn state
  useEffect(() => {
    if (isLoggedIn) {
      console.log("User is logged in:", isLoggedIn);
    } else {
      console.log("User is logged out.");
    }
  }, [isLoggedIn, user]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-language">
          <p>ENGLISH</p>
        </div>
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-button">
            <Link to="/loginform" className="">
              LogIn
            </Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
