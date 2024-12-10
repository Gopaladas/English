// AchievementsUpload.jsx
import React, { useEffect, useState } from "react";
import "./Achievements.css";
import axios from "axios";

const AchievementsUpload = () => {
  const [achievements, setAchievements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [id, setId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    descriptionPoints: [""],
    date: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]); // For image previews
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle adding a new description point
  const handleAddDescriptionPoint = () => {
    setFormValues({
      ...formValues,
      descriptionPoints: [...formValues.descriptionPoints, ""],
    });
  };

  // Handle description point change
  const handleDescriptionPointChange = (index, value) => {
    const updatedPoints = formValues.descriptionPoints.map((point, i) =>
      i === index ? value : point
    );
    setFormValues({ ...formValues, descriptionPoints: updatedPoints });
  };

  // Handle deleting a description point
  const handleDeleteDescriptionPoint = (index) => {
    const updatedPoints = formValues.descriptionPoints.filter(
      (_, i) => i !== index
    );
    setFormValues({ ...formValues, descriptionPoints: updatedPoints });
  };

  // Handle adding images
  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = [...formValues.images, ...files];
    setFormValues({ ...formValues, images: updatedImages });

    // Generate previews
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...imagePreviews]);
  };

  // Handle deleting an image
  const handleDeleteImage = (index) => {
    const updatedImages = formValues.images.filter((_, i) => i !== index);
    setFormValues({ ...formValues, images: updatedImages });

    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviews);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formValues.title.trim() ||
      formValues.descriptionPoints.some((point) => !point.trim()) ||
      !formValues.date ||
      formValues.images.length === 0
    ) {
      setErrors({
        submit: "Please fill in all fields and upload at least one image.",
      });
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("date", formValues.date);
    formValues.descriptionPoints.forEach((point, index) => {
      formData.append(`descriptionPoints`, point);
    });
    formValues.images.forEach((image, index) => {
      formData.append("images", image); // 'images' should be the field name expected by the backend
    });

    try {
      // const achivement = achievements[index];
      const url =
        editIndex === null
          ? `http://localhost:3000/api/achivement/createachievement`
          : `http://localhost:3000/api/achivement/editachievement/${id}`;
      const response = await axios.post(
        url, // Corrected endpoint and port
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      // setSuccessMessage("Achievement uploaded successfully!");
      setRefresh(true);
      // Optionally, update the achievements list if you fetch it from the server
      // setAchievements([...achievements, response.data.achievement]);

      // Reset form
      setFormValues({
        title: "",
        descriptionPoints: [""],
        date: "",
        images: [],
      });
      setPreviewImages([]);
      setErrors({});
      setShowForm(false);
    } catch (error) {
      console.error("Error uploading achievement:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "An error occurred while uploading. Please try again.",
      });
    }
  };

  // Handle adding a new achievement
  const handleAddAchievement = () => {
    setFormValues({
      title: "",
      descriptionPoints: [""],
      date: "",
      images: [],
    });
    setPreviewImages([]);
    setEditIndex(null);
    setShowForm(true);
    setErrors({});
    setSuccessMessage("");
  };

  // Handle editing an existing achievement
  const handleEditAchievement = (index) => {
    const achievement = achievements[index];
    setId(achievement._id);
    console.log(id);
    setFormValues({
      title: achievement.title,
      descriptionPoints: achievement.description,
      date: achievement.date,
      images: [...achievement.images], // Reset images; you might want to handle existing images differently
    });
    console.log(achievement.images);
    setPreviewImages([...achievement.images]); // Optionally, set previews for existing images
    setEditIndex(index);
    setShowForm(true);
    setErrors({});
    setSuccessMessage("");
  };

  // Handle deleting an achievement
  const handleDeleteAchievement = async (index) => {
    const id = achievements[index]._id;
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/achivement/deleteachievement/${id}`,
        {
          withCredentials: true,
        }
      );

      console.log(response);
      if(response?.success==true){
        setRefresh(true);
      }
    } catch (error) {
      console.error(error);
    }
    // const updatedAchievements = achievements.filter((_, i) => i !== index);
    setRefresh(true);
    // Optionally, make a DELETE request to the backend
  };

  // Handle form cancellation
  const handleCancel = () => {
    setShowForm(false);
    setFormValues({
      title: "",
      descriptionPoints: [""],
      date: "",
      images: [],
    });
    setPreviewImages([]);
    setEditIndex(null);
    setErrors({});
    setSuccessMessage("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/achivement/fetchachievement`,
          {
            withCredentials: true,
          }
        );

        console.log(response.data.achievements);
        setAchievements(response.data.achievements);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refresh]);

  return (
    <div className="achievements-container">
      <button className="add-achievement-btn" onClick={handleAddAchievement}>
        Add New Achievement
      </button>

      {/* Achievement List */}
      <div className="achievements-list">
        {achievements.map((achievement, index) => (
          <div className="achievement-card" key={index}>
            <div className="achievement-header">
              <h3>{achievement.title}</h3>
              <p>{achievement.date}</p>
            </div>
            <ul className="achievement-description">
              {achievement.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <div className="achievement-images">
              {achievement.images.map((img, i) => (
                <div className="image-container" key={i}>
                  <img src={`http://localhost:3000/Files/${img}`} alt={`Achievement ${i}`} />
                  {/* Optionally, add delete functionality for images */}
                </div>
              ))}
            </div>
            <div className="card-actions">
              <button
                className="edit-btn"
                onClick={() => handleEditAchievement(index)}
              >
                Add more
              </button>
              <button
                className="delete-card-btn"
                onClick={() => handleDeleteAchievement(index)}
              >
                Delete Card
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Form (Modal-like) */}
      {showForm && (
        <div className="achievement-form-overlay">
          <form
            className="achievement-form"
            onSubmit={handleFormSubmit}
            encType="multipart/form-data"
          >
            <h2>
              {editIndex !== null ? "Edit Achievement" : "Add New Achievement"}
            </h2>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleInputChange}
              placeholder="Achievement Title"
              required
            />
            <input
              type="date"
              name="date"
              value={formValues.date}
              onChange={handleInputChange}
              required
            />

            {formValues.descriptionPoints.map((point, index) => (
              <div className="description-point" key={index}>
                <input
                  type="text"
                  value={point}
                  onChange={(e) =>
                    handleDescriptionPointChange(index, e.target.value)
                  }
                  placeholder={`Description point ${index + 1}`}
                  required
                />
                {formValues.descriptionPoints.length > 1 && (
                  <button
                    type="button"
                    className="delete-point-btn"
                    onClick={() => handleDeleteDescriptionPoint(index)}
                  >
                    <b>X</b>
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="add-point"
              onClick={handleAddDescriptionPoint}
            >
              Add Description Point
            </button>

            <div className="image-upload">
              <label>Upload Images:</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddImage}
                required
              />
            </div>

            {/* Image Previews */}
            <div className="uploaded-images">
              {previewImages.map((imgSrc, index) => (
                <div className="uploaded-image" key={index}>
                  <img src={imgSrc} alt={`Uploaded ${index}`} />
                  <button
                    type="button"
                    className="delete-image-btn"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <b>X</b>
                  </button>
                </div>
              ))}
            </div>

            {errors.submit && (
              <div className="error-message">{errors.submit}</div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            <div className="form-actions">
              <button type="submit" className="submit">
                {editIndex !== null ? "Update" : "Add"}
              </button>
              <button type="button" className="cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AchievementsUpload;
