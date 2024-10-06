import React from "react";
import "./WelcomePage.css";
import { useSelector, useDispatch } from "react-redux";

const WelcomePage = () => {
  const { isloggedIn, user } = useSelector((state) => state.auth);

  return (
    <div className="welcome-container">
      <h1>
        Welcome to the {user?.role === "admin" ? "Admin" : "Faculty"} Panel
      </h1>
      <p>Manage the various aspects of the system from the sidebar.</p>
      <p>
        Use the sidebar to navigate between different sections like Faculty
        List, Department Courses, Achievements, Library, and more.
      </p>
      <p>
        For assistance, please refer to the help documentation or contact
        support.
      </p>
    </div>
  );
};

export default WelcomePage;
