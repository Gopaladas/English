import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPUC, setShowPUC] = useState(false);
  const [showEngg, setShowEngg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePUCToggle = () => {
    setShowPUC(!showPUC);
    setShowEngg(false); // Close Engineering dropdown when PUC is opened
  };

  const handleEnggToggle = () => {
    setShowEngg(!showEngg);
    setShowPUC(false); // Close PUC dropdown when Engineering is opened
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://res.cloudinary.com/dxyzgyveu/image/upload/v1725688981/rgukt_r1thhn.jpg"
          alt="RGUKT Logo"
        />
      </div>
      <div
        className="navbar-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/About-us">About</a>
        </li>
        <li onClick={() => setShowDropdown(!showDropdown)}>
          <a href="#department">Department courses</a>
          {showDropdown && (
            <ul className="dropdown">
              <li onClick={handlePUCToggle}>
                <a href="/courses">PUC</a>
                {showPUC && (
                  <ul className="sub-dropdown">
                    <li>
                      <a href="/courses">PUC1</a>
                    </li>
                    <li>
                      <a href="/courses">PUC2</a>
                    </li>
                  </ul>
                )}
              </li>
              <li onClick={handleEnggToggle}>
                <a href="/courses">Engineering</a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="/faculty">Faculty List</a>
        </li>
        <li>
          <a href="/achivements">Achievements</a>
        </li>
        <li>
          <a href="/library">Library</a>
        </li>
        <li>
          <a href="/competitive-english">Competitive English</a>
        </li>
        <li>
          <a href="gallery">Gallery</a>
        </li>
        <li>
          <a href="/start" className="logout-button">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
