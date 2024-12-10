import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Bookimgstudent = () => {
  const location = useLocation();
  const { Course } = location.state;
  const [courseYear, setCourseYear] = useState("2024");

  const handleDownload = () => {
    if (!Course?.pdf[0]) {
      alert("File URL is missing!");
      return;
    }

    const link = document.createElement("a");
    link.href = `http://localhost:3000/Files/${Course?.pdf[0]}`;
    link.download = Course?.pdfUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleYearChange = (e) => {
    setCourseYear(e.target.value);
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
          {/* Image and Course Info */}
          <div className="w-full lg:w-1/2">
            <img
              src={`http://localhost:3000/Files/${Course?.image}`}
              alt="Course"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
            <p className="text-xl font-semibold text-gray-700 mt-4">
              {Course?.title}
            </p>
            <div className="text-gray-600 mt-2">
              <span className="font-medium">Course Year:</span> {Course?.year}
            </div>
          </div>

          {/* Chapters and Actions */}
          <div className="w-full lg:w-1/2 space-y-4">
            {Course?.chapters?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 rounded-lg p-4 shadow-sm"
              >
                <div>
                  <p className="text-gray-700 font-medium">
                    Chapter: {item?.chapter}
                  </p>
                  <a
                    href={item?.link}
                    className="text-blue-500 underline mt-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Chapter
                  </a>
                </div>
                <button
                  onClick={handleDownload}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookimgstudent;
