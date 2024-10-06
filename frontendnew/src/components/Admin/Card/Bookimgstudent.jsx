import React, { useState } from "react";
import "./Bookimgstudent.css";
import oneImage from "./book1.jpeg";
import { useLocation } from "react-router-dom";

const Bookimgstudent = () => {
  const location = useLocation();
  const { Course } = location.state;
  const [image, setImage] = useState(oneImage);
  const [editMessage, setEditMessage] = useState(null);
  const [courseYear, setCourseYear] = useState("2024"); // Added state for course year

  //   const handleEdit = () => {
  //     setEditMessage("You have clicked Edit. Redirecting to another page...");
  //   };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = Course?.pdfUrl;
    link.download = Course?.img;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //   const handleDelete = () => {
  //     setImage(null);
  //   };

  const handleYearChange = (e) => {
    setCourseYear(e.target.value); // Update the course year when user types in the input field
  };

  return (
    <div className="bookcontaine">
      {
        <>
          <div className="image-container">
            <img src={Course?.image} alt="Selected" className="image" />
            <p className="title">{Course?.title}</p>
            <div className="course-label">
              <p className="course-input">Course Year:{Course?.year}</p>
            </div>
          </div>
          {console.log(Course)}
          <div className="right-container">
            <div className="links-container">
              {Course?.chapters?.map((item) => {
                return (
                  <>
                    {console.log(item)}
                    <div className="link-group">
                      <p className="link-heading">
                        chapter : {item?.chapter} |
                        <a href={item?.link} className="link">
                          click here
                        </a>
                      </p>
                      <button
                        className="button downloadbutton"
                        onClick={handleDownload}
                      >
                        Download{" "}
                      </button>
                    </div>
                  </>
                );
              })}

              {/* <div className="link-group">
                <p className="link-heading">Heading for Link 2</p>
                <a href="/" className="link">
                  Link 2
                </a>
              </div> */}
            </div>
          </div>
        </>
      }
      {/* {editMessage && <p>{editMessage}</p>} */}
    </div>
  );
};

export default Bookimgstudent;
