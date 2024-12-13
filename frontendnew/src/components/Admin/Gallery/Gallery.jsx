// src/components/Upload.js

import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Upload = () => {
  const {backend_url}=useSelector((state)=>state.auth);
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  const handleBack = () => {
    navigate("/gallery");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select at least one image to upload.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    const galleryUrl = id
      ? `${backend_url}/api/admin/addimages/${id}`
      : `${backend_url}/api/admin/uploadimages`;
    try {
      setUploading(true);
      const res = await axios.post(galleryUrl, formData, {
        withCredentials: true,
      });

      if (res.status === 201) {
        setSelectedFiles([]);
        setPreviewImages([]);
        navigate("/gallery");
      } else {
        console.log("Upload failed");
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviewImages(updatedPreviews);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {id ? "Add" : "Upload"} Images for Gallery
        </h1>
        <div className="flex justify-center mb-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Back
          </button>
        </div>
        <form
          onSubmit={handleUpload}
          className="flex flex-col items-center space-y-4"
        >
          <label className="w-full">
            <span className="sr-only">Choose images</span>
            <input
              type="file"
              multiple
              onChange={handleOnChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
          <button
            type="submit"
            disabled={uploading}
            className={`w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
        {previewImages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Preview Images
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previewImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={image}
                    alt={`preview-${index}`}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
