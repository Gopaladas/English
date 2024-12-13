import React, { useState, useEffect } from "react";
import axios from "axios"; // Add axios for HTTP requests
import "./FacultyList.css";
import FacultyCard from "./FacultyCard";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startloading, stoploading } from "../../../store/auth/authSlice";
import Loader from "../Loader/Loader";

const FacultyList = () => {
  const { isLoggedIn, user, isloading ,backend_url} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [faculty, setFaculty] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [created, setCreated] = useState(false);

  const navigate = useNavigate();

  // Fetch faculty data from the backend
  useEffect(() => {
    const fetchFacultyData = async () => {
      dispatch(startloading());
      try {
        const response = await axios.get(
          `${backend_url}/api/faculty/facultydetails`,
          {
            withCredentials: true,
          }
          // "http://localhost:5000/api/faculty/"
        ); // Adjust API endpoint as needed
        console.log(response.data.data);
        setFaculty(response.data.data);

        // console.log("Hi : ", faculty);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      } finally {
        dispatch(stoploading());
      }
    };

    fetchFacultyData();
  }, [created]);

  // console.log("hey");

  // Handle deleting faculty from the backend
  const handleDelete = async (index) => {
    const facultyToDelete = faculty[index];
    console.log(facultyToDelete);
    try {
      const res = await axios.delete(
        `${backend_url}/api/admin/deletefaculty/${facultyToDelete._id}`,
        {
          withCredentials: true,
        }
      ); // Adjust API endpoint
      console.log(res);
      if (res.data.success === true) {
        console.log(res);
        const updatedFaculty = faculty.filter((_, i) => i !== index);
        setFaculty(updatedFaculty);
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const handleInfo = (index) => {
    setNewFaculty(faculty[index]);
    setCurrentIndex(index);
    setIsEditing(true);
    setShowForm(true);

    navigate(`/info/${faculty[index]._id}`);
  };

  const handleAddFaculty = () => {
    setNewFaculty({
      name: "",
      email: "",
      password: "",
    });
    setProfilePicFile(null);
    setCurrentIndex(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewFaculty({
      ...newFaculty,
      [name]: value,
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewFaculty({ ...newFaculty, profilePic: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(startloading());
      const data = {
        name: newFaculty.name,
        email: newFaculty.email,
        password: newFaculty.password,
      };
      // axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${backend_url}/api/admin/createFaculty`,
        data,
        {
          withCredentials: true,
        }
      );

      console.log(res);
      if (res?.data?.success) {
        setCreated(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stoploading());
    }

    setNewFaculty({
      name: "",
      email: "",
      password: "",
    });
    setProfilePicFile(null);
    setShowForm(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="faculty-page">
      <h1>Faculty Management</h1>
      {user?.role === "admin" && (
        <button className="add-faculty-btn" onClick={handleAddFaculty}>
          Add Faculty
        </button>
      )}

      {/* Modal Form Overlay */}
      {showForm && (
        <div className="form-overlay">
          <form className="faculty-form" onSubmit={handleSubmit}>
            <h2>Add New Faculty</h2>
            <input
              type="text"
              name="name"
              value={newFaculty.name}
              onChange={handleFormChange}
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="email"
              value={newFaculty.email}
              onChange={handleFormChange}
              placeholder="email"
              required
            />
            <input
              type="password"
              name="password"
              value={newFaculty.password}
              onChange={handleFormChange}
              placeholder="Password"
              required
            />
            {/* <input
              type="email"
              name="email"
              value={newFaculty.email}
              onChange={handleFormChange}
              placeholder="Email"
              required
            />
            <input
              type="file"
              name="profilePic"
              onChange={handleProfilePicChange}
              accept="image/*"
              required
            /> */}
            <div className="addcancelbutton">
              <button type="submit" className="submit-btn">
                {/* {isEditing ? "Update" : "Add"} */}
                Add
              </button>
              <button type="button" className="cancel-btn" onClick={closeForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isloading ? (
        <Loader />
      ) : (
        <div className="faculty-cards">
          {faculty.map((member, index) => (
            <FacultyCard
              key={index}
              faculty={member}
              onDelete={() => handleDelete(index)}
              onInfo={() => handleInfo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyList;
