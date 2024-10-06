import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Sample data (you should replace this with your actual data source)
// const facultyData = [
//   {
//     id: 1,
//     name: 'Dr. John Doe',
//     designation: 'Professor',
//     image: 'https://via.placeholder.com/150', // Replace with actual image URL
//   },
//   {
//     id: 2,
//     name: 'Prof. Jane Smith',
//     designation: 'Associate Professor',
//     image: 'https://via.placeholder.com/150', // Replace with actual image URL
//   },
//   {
//     id: 3,
//     name: 'Dr. Emily Davis',
//     designation: 'Lecturer',
//     image: 'https://via.placeholder.com/150', // Replace with actual image URL
//   },
//   {
//     id: 4,
//     name: 'Prof. David Lee',
//     designation: 'Assistant Professor',
//     image: 'https://via.placeholder.com/150', // Replace with actual image URL
//   },
//   {
//     id: 5,
//     name: 'Dr. Sarah Brown',
//     designation: 'Professor',
//     image: 'https://via.placeholder.com/150', // Replace with actual image URL
//   },
//   {
//     id: 6,
//     name: 'Prof. Alan White',
//     designation: 'Associate Professor',
//     image: 'https://via.placeholder.com/150', // Replace with actual image URL
//   },
//   // Add more faculty members as needed
// ];

const Faculty = () => {
  const { id } = useParams();
  console.log(id);
  const [facultyData, setFacultyData] = useState();
  useEffect(() => {
    try {
      const fetchEachFaculty = async () => {
        const res = await axios.get(
          `http://localhost:3000/api/admin/eachfacultydetails/${id}`,
          {
            withCredentials: true,
          }
        );

        console.log(res.data.data.existfaculty);

        setFacultyData(res.data.data.existfaculty);
      };

      fetchEachFaculty();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(facultyData);

  return (
    <div className="container mx-auto p-4 sm:p-6 ">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">
        Faculty Members
      </h1>

      {/* Responsive Grid for Faculty Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {
          <div
            key={facultyData?._id}
            className="relative text-center p-4 md:p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl -z-10"></div>
            <img
              src={facultyData?.image}
              alt={facultyData?.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-3 md:mb-4 object-cover border-4 border-white shadow-md"
            />
            <h2 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gray-900">
              {facultyData?.name}
            </h2>
            <p className="text-sm md:text-md text-gray-600 mb-3 md:mb-4">
              {facultyData?.email}
            </p>
            <p className="text-sm md:text-md text-gray-600 mb-3 md:mb-4">
              {facultyData?.designation}
            </p>
            <Link
              to={`/faculty-details/${facultyData?._id}`}
              className="inline-block px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-medium rounded-full shadow-lg hover:from-blue-600 hover:to-purple-500 focus:ring-2 focus:ring-blue-400 transition duration-200"
            >
              View More
            </Link>
          </div>
        }
      </div>
    </div>
  );
};

export default Faculty;
