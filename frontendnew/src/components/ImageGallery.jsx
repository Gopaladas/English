import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// const images = [
//   {
//     id: 1,
//     src: "https://via.placeholder.com/300x200.png?text=Image+1",
//     alt: "Image 1",
//   },
//   {
//     id: 2,
//     src: "https://via.placeholder.com/300x200.png?text=Image+2",
//     alt: "Image 2",
//   },
//   {
//     id: 3,
//     src: "https://via.placeholder.com/300x200.png?text=Image+3",
//     alt: "Image 3",
//   },
//   {
//     id: 4,
//     src: "https://via.placeholder.com/300x200.png?text=Image+4",
//     alt: "Image 4",
//   },
//   {
//     id: 5,
//     src: "https://via.placeholder.com/300x200.png?text=Image+5",
//     alt: "Image 5",
//   },
//   {
//     id: 6,
//     src: "https://via.placeholder.com/300x200.png?text=Image+6",
//     alt: "Image 6",
//   },
// ];

const ImageGallery = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [imagesData, setImagesData] = useState([]);

  const handleUpload = () => {
    navigate("/adminMain/uploadImage");
  };

  const handleBack = () => {
    if (user?.role === "admin") {
      navigate("/adminMain");
    } else if (user?.role === "user") {
      navigate("/userMain");
    }
  };

  const handleAdd = (id) => {
    navigate(`/adminMain/uploadImage/${id}`);
  };
  useEffect(() => {
    if (isLoggedIn) {
      console.log(user);
    } else {
      console.log("logged Out");
    }

    const fetchGallery = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/imagesdata",
          {
            withCredentials: true,
          }
        );
        console.log(res.data.data);
        setImagesData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGallery();
  }, [isLoggedIn, user]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Image Gallery</h1>
      {user?.role === "admin" && (
        <button
          type="button"
          onClick={handleUpload}
          className="h-[50px] w-[100px] bg-green-500 rounded my-[20px]"
        >
          Upload
        </button>
      )}

      <button
        type="button"
        onClick={handleBack}
        className="h-[50px] w-[100px] bg-blue-500 rounded my-[20px]"
      >
        Back
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {imagesData?.map((image) => (
          <div
            key={image._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-wrap gap-2 justify-center">
              {image?.images.map((item, idx) => (
                <img
                  key={idx}
                  src={item}
                  alt={`image-${idx}`}
                  className="w-[48%] h-[150px] object-cover rounded-md"
                />
              ))}
            </div>
            {user?.role === "admin" && (
              <button
                className="h-[50px] w-[100px] bg-red-500 rounded my-[20px]"
                onClick={() => handleAdd(image._id)}
              >
                Add
              </button>
            )}

            {/* <p className="text-center mt-2 font-semibold">{image.alt}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
