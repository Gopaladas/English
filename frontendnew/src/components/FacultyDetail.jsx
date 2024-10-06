import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FacultyDetail = () => {
  const { id } = useParams();
  const { isLoggedin, user } = useSelector((state) => state.auth);
  console.log(id);
  const [facultyData, setFacultyData] = useState(null);
  useEffect(() => {
    if (id) {
      try {
        const fetchEachFaculty = async () => {
          const res = await axios.get(
            `http://localhost:3000/api/admin/eachfacultydetails/${id}`,
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
      }
    } else {
      setFacultyData(user);
    }
  }, []);

  if (!facultyData) {
    return (
      <div className="container mx-auto p-6">Faculty member not found.</div>
    );
  }

  return (
    <div className="container mx-auto p-6 font-serif">
      <div className="text-center mb-8">
        <img
          src={facultyData?.imageUrl}
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
              {facultyData.email}
              {console.log(facultyData.email)}
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
            <a
              href={facultyData?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-indigo-500 text-white py-2 px-4 rounded mr-2 hover:bg-indigo-700"
            >
              View Resume
            </a>
            <a
              href={facultyData?.resume}
              download
              className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Download Resume
            </a>
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
  );
};

export default FacultyDetail;
