import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startloading, stoploading } from "../store/auth/authSlice";
import Loader from "./Admin/Loader/Loader";

const FacultyDetail = () => {
  const { id } = useParams();
  const { isLoggedin, user, isloading,backend_url } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(id);
  const [facultyData, setFacultyData] = useState(null);
  useEffect(() => {
    if (id) {
      try {
        dispatch(startloading());
        const fetchEachFaculty = async () => {
          const res = await axios.get(
            `${backend_url}/api/admin/eachfacultydetails/${id}`,
            {
              withCredentials: true,
            }
          );

          console.log(res.data.data.existfaculty);
          console.log(res.data.data.existfaculty.email);

          setFacultyData(res.data.data.existfaculty);
        };

        fetchEachFaculty();
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(stoploading());
      }
    } else {
      setFacultyData(user);
    }
  }, []);

  if (!facultyData) {
    return (
      // <div className="container mx-auto p-6">Faculty member not found.</div>
      <Loader />
    );
  }

  const handleviewResume = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.error("Resume url is not available");
    }
  };

  const handleDownloadResume = (url) => {
    console.log(url);
    if (url) {
      const link = document.createElement("a");
      link.href = `${backend_url}/Files/${url}`;
      link.download = "Resume.pdf"; // You can customize the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Resume URL is not available.");
    }
  };

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-6 font-serif">
          <div className="text-center mb-8">
            <img
              src={`${backend_url}/Files/${facultyData?.imageUrl}`}
              alt={facultyData?.name}
              className="w-48 h-48 rounded-full mx-auto border border-gray-300 shadow-lg"
            />
            <h1 className="text-4xl font-extrabold mt-4 text-black">
              {facultyData?.name}
            </h1>
            <p className="text-2xl font-medium text-black">
              {facultyData?.designation}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-semibold mb-4 text-indigo-700">
                Contact Details
              </h2>
              <p className="text-lg text-black mb-2">
                Email:{" "}
                <a href={`mailto:${facultyData?.email}`} className="text-black">
                  {facultyData?.email}
                  {console.log(facultyData?.email)}
                </a>
              </p>
              <p className="text-lg text-gray-800 mb-2">
                Phone: {facultyData?.phone}
              </p>
              <p className="text-lg text-gray-800 mb-2">
                Qualification: {facultyData?.qualification}
              </p>
              {/* View and Download Resume Buttons */}
              <div className="mt-4">
                <button
                  onClick={() => window.open(`${backend_url}/Files/${facultyData?.resumeUrl}`, "_blank")}
                  className="inline-block bg-indigo-500 text-white py-2 px-4 rounded mr-2 hover:bg-indigo-700"
                >
                  View Resume
                </button>

                {/* <button
                  onClick={() => handleDownloadResume(facultyData?.resumeUrl)}
                  className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  Download Resume
                </button> */}
              </div>
            </div>
            <div className="lg:w-2/3">
              <h2 className="text-3xl font-semibold mb-4 text-indigo-700">
                Additional Information
              </h2>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  Awards:
                </h3>
                <ul className="list-disc ml-6 text-lg text-gray-800">
                  {facultyData?.awards?.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  Achievements:
                </h3>
                <ul className="list-disc ml-6 text-lg text-gray-800">
                  {facultyData?.achievements?.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  Contributions:
                </h3>
                <ul className="list-disc ml-6 text-lg text-gray-800">
                  {facultyData?.contributions?.map((contribution, index) => (
                    <li key={index}>{contribution}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  Specialization:
                </h3>
                <ul className="list-disc ml-6 text-lg text-gray-800">
                  {facultyData?.specialization?.map((specialty, index) => (
                    <li key={index}>{specialty}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-indigo-600">
                  Bio:
                </h3>
                <p className="text-lg text-gray-800">{facultyData?.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FacultyDetail;
