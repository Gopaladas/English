import React from 'react';
import './Profile.css'; // Ensure this path is correct based on your project structure

const Profile = () => {
  return (
    <div className="profile-card">
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-pic-container">
        <img src="profile-pic-url" alt="Profile" className="profile-pic" />
      </div>
      <div className="profile-info">
        <h3 className="profile-name">Dr. N. Vijaykumar</h3>
        <p className="profile-degree">M.A, PGDTE</p>
        <p className="profile-title">Head of the Department</p>
        <p className="profile-email">Email: xxxx@gmail.com</p>
        <p className="profile-phone">Phone: xxxxxxxxx</p>
      </div>
    </div>
  );
};

export default Profile;
