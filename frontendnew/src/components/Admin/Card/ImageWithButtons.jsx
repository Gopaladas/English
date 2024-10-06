import React, { useState } from "react";
import "./ImageWithButtons.css";
import oneImage from "./book1.jpeg";

const ImageWithButtons = () => {
  const [image, setImage] = useState(oneImage);
  const [editMessage, setEditMessage] = useState(null);
  const [courseYear, setCourseYear] = useState("2024"); // Added state for course year

  const handleEdit = () => {
    setEditMessage("You have clicked Edit. Redirecting to another page...");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "image.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = () => {
    setImage(null);
  };

  const handleYearChange = (e) => {
    setCourseYear(e.target.value); // Update the course year when user types in the input field
  };

  return (
    <div className="container">
      {image ? (
        <>
          <div className="image-container">
            <img src={oneImage} alt="Selected" className="image" />
          </div>
          <div className="right-container">
            <p className="title">Image Title</p>
            <div className="course-label">
              <p className="course-input">Course Year:p1</p>
            </div>
            <div className="links-container">
              <div className="link-group">
                <p className="link-heading">Heading for Link 1</p>
                <a href="/" className="link">
                  Link 1
                </a>
              </div>
              <div className="link-group">
                <p className="link-heading">Heading for Link 2</p>
                <a href="/" className="link">
                  Link 2
                </a>
              </div>
            </div>
            <div className="button-container">
              <button className="button editbutton" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="button downloadbutton"
                onClick={handleDownload}
              >
                Download
              </button>
              <button className="button deletebutton" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>No image to display.</p>
      )}
      {editMessage && <p>{editMessage}</p>}
    </div>
  );
};

export default ImageWithButtons;
