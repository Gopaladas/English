// WelcomePage.jsx
import React from "react";
import "./WelcomePage.css";
import { useSelector } from "react-redux";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";

const WelcomePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="welcome-page-container">
      {/* Hero Section */}
      <section className="welcome-hero-section">
        <div className="welcome-hero-overlay">
          <h1>
            Welcome to the {user?.role === "admin" ? "Admin" : "English"}{" "}
            Department
          </h1>
          <p>
            Inspiring Minds, Fostering Creativity, and Cultivating Excellence
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="welcome-about-section">
        <h2>About Us</h2>
        <p>
          The English Department is dedicated to the study and appreciation of
          English literature, language, and creative writing. We aim to
          cultivate critical thinking, effective communication, and a lifelong
          love for the written word.
        </p>
      </section>

      {/* Featured Courses */}
      <section className="welcome-courses-section">
        <h2>Featured Courses</h2>
        <div className="welcome-courses-grid">
          <div className="welcome-course-card">
            <FaBookOpen className="welcome-course-icon" />
            <h3>Advanced Literature</h3>
            <p>Dive deep into classic and contemporary literary works.</p>
          </div>
          <div className="welcome-course-card">
            <FaChalkboardTeacher className="welcome-course-icon" />
            <h3>Creative Writing</h3>
            <p>Enhance your storytelling and creative expression skills.</p>
          </div>
          <div className="welcome-course-card">
            <FaBookOpen className="welcome-course-icon" />
            <h3>Modern Poetry</h3>
            <p>Explore the nuances and forms of modern poetic expressions.</p>
          </div>
        </div>
      </section>

      {/* Events/News */}
      <section className="welcome-events-section">
        <h2>Upcoming Events</h2>
        <div className="welcome-events-grid">
          <div className="welcome-event-card">
            <FaCalendarAlt className="welcome-event-icon" />
            <h3>Literature Symposium</h3>
            <p>
              Join us for a day of discussions and presentations on contemporary
              literature.
            </p>
          </div>
          <div className="welcome-event-card">
            <FaCalendarAlt className="welcome-event-icon" />
            <h3>Creative Writing Workshop</h3>
            <p>Enhance your writing skills with our hands-on workshop.</p>
          </div>
          <div className="welcome-event-card">
            <FaCalendarAlt className="welcome-event-icon" />
            <h3>Annual Poetry Reading</h3>
            <p>Celebrate poetry with readings from students and faculty.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
