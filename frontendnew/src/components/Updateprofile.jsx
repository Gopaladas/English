import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, startloading, stoploading } from "../store/auth/authSlice";
import Loader from "./Admin/Loader/Loader";
import { Navigate } from "react-router-dom";

const FacultyUpdateForm = () => {
  const { isLoggedin, user, isloading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    bio: "",
    email: "",
    phone: "",
    qualification: "",
    awards: [""],
    achievements: [""],
    contributions: [""],
    specialization: [""],
  });

  const [imageUrl, setImageUrl] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const handleArrayChange = (index, field, value) => {
  //     const updatedArray = [...formData[field]];
  //     updatedArray[index] = value;
  //     setFormData({ ...formData, [field]: value });
  //   };

  const dispatch = useDispatch();
  const handleArrayChange = (index, field, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value; // Correct update to the specific array field
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (field, index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const handleResumeChange = (e) => {
    setResumeUrl(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const facultyData = new FormData();

    facultyData.append("name", formData.name);
    facultyData.append("designation", formData.designation);
    facultyData.append("bio", formData.bio);
    facultyData.append("email", formData.email);
    facultyData.append("phone", formData.phone);
    facultyData.append("qualification", formData.qualification);
    facultyData.append("awards", JSON.stringify(formData.awards));
    facultyData.append("achievements", JSON.stringify(formData.achievements));
    facultyData.append("contributions", JSON.stringify(formData.contributions));
    facultyData.append(
      "specialization",
      JSON.stringify(formData.specialization)
    );

    if (imageUrl) {
      facultyData.append("imageUrl", imageUrl);
    }

    if (resumeUrl) {
      facultyData.append("resumeUrl", resumeUrl);
    }

    const url =
      user?.role === "admin"
        ? "http://localhost:3000/api/admin/updateAdmin"
        : "http://localhost:3000/api/faculty/updatedatails";
    try {
      dispatch(startloading());
      const response = await axios.post(url, facultyData, {
        withCredentials: true,
      });
      console.log(response);
      console.log(user);
      if (response?.data?.success == true) {
        console.log(user?.isFaculty);
        const url = user.isFaculty
          ? `http://localhost:3000/api/faculty/eachfacultydetails/${user.id}`
          : `http://localhost:3000/api/admin/admindata/${user.id}`;
        const res = await axios.get(url, {
          withCredentials: true,
        });
        console.log(res);
        dispatch(loggedIn(res?.data?.user));
      }
      setMessage(response?.data?.message);
      setSuccess(true);
    } catch (error) {
      setMessage("Error updating faculty details.");
    } finally {
      dispatch(stoploading());
    }
  };

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="faculty-update-form">
          <h2>Update {user?.role === "admin" ? "Admin" : "Faculty"} Details</h2>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Designation:</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Qualification:</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Awards */}
            <div>
              <label>Awards:</label>
              {formData.awards.map((award, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={award}
                    onChange={
                      (e) => handleArrayChange(index, "awards", e.target.value)
                      //   handleInputChange
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeField("awards", index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addField("awards")}>
                Add Award
              </button>
            </div>

            {/* Achievements */}
            <div>
              <label>Achievements:</label>
              {formData.achievements.map((achievement, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={achievement}
                    onChange={
                      (e) =>
                        handleArrayChange(index, "achievements", e.target.value)
                      //   handleInputChange
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeField("achievements", index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addField("achievements")}>
                Add Achievement
              </button>
            </div>

            {/* Contributions */}
            <div>
              <label>Contributions:</label>
              {formData.contributions.map((contribution, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={contribution}
                    onChange={
                      (e) =>
                        handleArrayChange(
                          index,
                          "contributions",
                          e.target.value
                        )
                      //   handleInputChange
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeField("contributions", index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addField("contributions")}>
                Add Contribution
              </button>
            </div>

            {/* Specialization */}
            <div>
              <label>Specialization:</label>
              {formData.specialization.map((specialization, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={specialization}
                    onChange={
                      (e) =>
                        handleArrayChange(
                          index,
                          "specialization",
                          e.target.value
                        )
                      //   handleInputChange
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeField("specialization", index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => addField("specialization")}>
                Add Specialization
              </button>
            </div>

            {/* File Uploads */}
            <div>
              <label>Upload Faculty Image:</label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>
            <div>
              <label>Upload Faculty Resume (PDF):</label>
              <input
                type="file"
                onChange={handleResumeChange}
                accept="application/pdf"
                required
              />
            </div>

            <button type="submit">Update Faculty</button>
          </form>
        </div>
      )}
    </>
  );
};

export default FacultyUpdateForm;
