import React from "react";
import "./FacultyList.css";
import { useDispatch, useSelector } from "react-redux";

const FacultyCard = ({ faculty, onDelete, onInfo }) => {
  const { isLoggedIn, user, isloading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  return (
    <div className="faculty-card">
      <img
        src={faculty?.imageUrl}
        alt={faculty?.name}
        className="faculty-pic"
      />
      <h3 className="faculty-name">{faculty?.name}</h3>
      {/* <p className="faculty-degree">{faculty?.degree}</p> */}
      {/* <p className="faculty-title">{faculty?.title}</p> */}
      <p className="faculty-email">Email: {faculty?.email}</p>
      <div className="editdeletebtn">
        <button className="edit-btn" onClick={onInfo}>
          info
        </button>
        {user?.role === "admin" && (
          <button className="delete-btn" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default FacultyCard;
