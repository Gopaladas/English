import React, { useState } from "react";
import "./Achievements.css";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    date: "",
    descriptionPoints: [""],
    images: []
  });

  const handleAddAchievement = () => {
    setFormValues({
      title: "",
      date: "",
      descriptionPoints: [""],
      images: []
    });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleEditAchievement = (index) => {
    setFormValues(achievements[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Edit existing achievement
      const updatedAchievements = [...achievements];
      updatedAchievements[editIndex] = formValues;
      setAchievements(updatedAchievements);
    } else {
      // Add new achievement
      setAchievements([...achievements, formValues]);
    }
    setShowForm(false); // Close form after submission
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddDescriptionPoint = () => {
    setFormValues({
      ...formValues,
      descriptionPoints: [...formValues.descriptionPoints, ""]
    });
  };

  const handleDescriptionPointChange = (index, value) => {
    const updatedPoints = formValues.descriptionPoints.map((point, i) =>
      i === index ? value : point
    );
    setFormValues({ ...formValues, descriptionPoints: updatedPoints });
  };

  const handleDeleteDescriptionPoint = (index) => {
    const updatedPoints = formValues.descriptionPoints.filter((_, i) => i !== index);
    setFormValues({ ...formValues, descriptionPoints: updatedPoints });
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      images: [...formValues.images, URL.createObjectURL(file)]
    });
  };

  const handleDeleteImage = (index) => {
    const updatedImages = formValues.images.filter((_, i) => i !== index);
    setFormValues({ ...formValues, images: updatedImages });
  };

  const handleDeleteAchievement = (index) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

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
              {achievement.descriptionPoints.map((point, i) => (
                <li key={i}>
                  {point}
                </li>
              ))}
            </ul>
            <div className="achievement-images">
              {achievement.images.map((img, i) => (
                <div className="image-container" key={i}>
                  <img src={img} alt={`Achievement ${i}`} />
                  {/* <button className="delete-image-btn" onClick={() => handleDeleteImage(i)}>Delete</button> */}
                </div>
              ))}
            </div>
            <div className="card-actions">
              <button className="edit-btn" onClick={() => handleEditAchievement(index)}>Edit</button>
              <button className="delete-card-btn" onClick={() => handleDeleteAchievement(index)}>Delete Card</button>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Form (Modal-like) */}
      {showForm && (
        <div className="achievement-form-overlay">
          <form className="achievement-form" onSubmit={handleFormSubmit}>
            <h2>{editIndex !== null ? "Edit Achievement" : "Add New Achievement"}</h2>
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
                  onChange={(e) => handleDescriptionPointChange(index, e.target.value)}
                  placeholder={`Description point ${index + 1}`}
                />
                <button type="button" className="delete-point-btn" onClick={() => handleDeleteDescriptionPoint(index)}><b>X</b></button>
              </div>
            ))}

            <button type="button" className="add-point" onClick={handleAddDescriptionPoint}>
              Add Description Point
            </button>

            <div className="image-upload">
              <label>Upload Images:</label>
              <input type="file" onChange={handleAddImage} />
            </div>

            <div className="uploaded-images">
              {formValues.images.map((img, index) => (
                <div className="uploaded-image" key={index}>
                  {/* <span>Image {index + 1}</span> */}
                  <img src={img} alt={`Uploaded ${index}`} width={50} height={50} />
                  <button type="button" className="delete-image-btn" onClick={() => handleDeleteImage(index)}><b>X</b></button>
                </div>
              ))}
            </div>

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

export default Achievements;
