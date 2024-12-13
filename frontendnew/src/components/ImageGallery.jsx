// src/components/ImageGallery.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startloading, stoploading } from "../store/auth/authSlice";
import Loader from "./Admin/Loader/Loader";

const ImageGallery = () => {
  const { isLoggedIn, user, isloading ,backend_url} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imagesData, setImagesData] = useState([]);

  // State for modal
  const [modalImage, setModalImage] = useState(null);

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

  const handleView = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const handleViewAll = (id) => {
    navigate(`/gallery/viewAll/${id}`);
  };
  const handleClose = () => {
    setModalImage(null);
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log(user);
    } else {
      console.log("logged Out");
    }

    const fetchGallery = async () => {
      try {
        dispatch(startloading());
        const res = await axios.get(
          `${backend_url}/api/admin/imagesdata`,
          {
            withCredentials: true,
          }
        );
        console.log(res.data.data);
        setImagesData(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(stoploading());
      }
    };

    fetchGallery();
  }, [isLoggedIn, user, dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Image Gallery
      </h1>

      {/* Admin Upload Button */}
      {user?.role === "admin" && (
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={handleUpload}
            className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow-lg transition-colors duration-300"
          >
            Upload Image
          </button>
        </div>
      )}

      {/* Back Button */}
      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={handleBack}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow-lg transition-colors duration-300"
        >
          Back
        </button>
      </div>

      {/* Loader */}
      {isloading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {imagesData?.map((image) => (
            <div
              key={image._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              style={{ width: "300px", height: "400px" }} // Fixed card size
            >
              {/* Image Grid */}
              <div className="flex-1 p-4 overflow-hidden">
                <div className="grid grid-cols-2 gap-2 h-full">
                  {image?.images.map((item, idx) => (
                    <img
                      key={idx}
                      src={`${backend_url}/Files/${item}`}
                      alt={`image-${idx}`}
                      className="w-full h-40 object-cover rounded-md cursor-pointer"
                      onClick={() => handleView(item)}
                      loading="lazy" // Lazy loading for performance
                    />
                  ))}
                </div>
              </div>

              {/* Add Button for Admin */}
              {user?.role === "admin" && (
                <div className="flex justify-center mb-4">
                  <button
                    className="px-5 py-2 bg-red-500 hover:bg-blue-600 text-white font-semibold rounded shadow-lg transition-colors duration-300"
                    onClick={() => handleAdd(image._id)}
                  >
                    Add Image
                  </button>
                  <button
                    className="px-5 py-2 bg-green-500 hover:bg-blue-600 text-white font-semibold rounded shadow-lg transition-colors duration-300"
                    onClick={() => handleViewAll(image._id)}
                  >
                    View All
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden relative max-w-3xl w-full mx-4">
            <button
              className="absolute top-4 right-4 text-gray-600 font-bold text-2xl"
              onClick={handleClose}
              aria-label="Close Modal"
            >
              &times;
            </button>
            <img
              src={`${backend_url}/Files/${modalImage}`}
              alt="Enlarged view"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
