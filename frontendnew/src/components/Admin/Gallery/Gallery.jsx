import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Upload = () => {
  const { id } = useParams();
  const [selectedFile, setSelectedFile] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFile(files);

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  const handleBack = () => {
    navigate("/gallery");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Array.from(selectedFile).forEach((file) => {
      formData.append("images", file);
    });
    const galleryUrl = id
      ? `http://localhost:3000/api/admin/addimages/${id}`
      : "http://localhost:3000/api/admin/uploadimages";
    try {
      const res = await axios.post(galleryUrl, formData, {
        withCredentials: true,
      });

      if (!res) {
        console.log("not successfull");
        return;
      }

      setSelectedFile(null);
      navigate("/gallery");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full h-full">
      <h1>{id ? "Add" : "Upload"} image for Gallery</h1>
      <button
        className="h-[50px] w-[100px] bg-blue-500 rounded my-[20px]"
        onClick={handleBack}
      >
        Back
      </button>
      <div className="m-auto h-[100px] w-[500px] bg-green-100">
        <form
          onSubmit={handleUpload}
          className="m-auto h-full w-full flex justify-center align-center"
        >
          <input type="file" multiple onChange={handleOnChange} />
          <button
            type="submit"
            className="h-[50px] w-[100px] bg-green-500 rounded my-[20px]"
          >
            Upload
          </button>
        </form>
      </div>
      {previewImages.length > 0 && (
        <div className="preview-container grid grid-cols-3 gap-4 mt-4">
          {previewImages.map((image, index) => (
            <div key={index} className="preview-item">
              <img
                src={image}
                alt={`preview-${index}`}
                className="w-full h-[150px] object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upload;
