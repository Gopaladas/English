import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./viewAll.css"; // Assuming you create a CSS file for styling
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { startloading, stoploading } from "../../../store/auth/authSlice";

const ViewAll = () => {
  const { id } = useParams();
  const { isLoggedIn, user, isloading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(startloading());
        const response = await axios.get(
          `http://localhost:3000/api/admin/singleEventData/${id}`
        );
        console.log(response);
        setImages(response.data.data.images); // Assuming the images are in an 'images' field
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        dispatch(stoploading());
      }
    };

    getData();
  }, [id]);

  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className="gallery-container">
          <h1>Event Gallery</h1>
          <div className="image-grid">
            {images?.length > 0 ? (
              images?.map((img, index) => (
                <div key={index} className="image-item">
                  <img src={`http://localhost:3000/Files/${img}`} alt={`Event Image ${index + 1}`} />
                </div>
              ))
            ) : (
              <div>No images available</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAll;
