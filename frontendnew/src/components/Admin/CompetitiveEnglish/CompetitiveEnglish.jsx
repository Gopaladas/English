// AchievementsUpload.jsx
import React, { useEffect, useState } from "react";
import "./CE.css";
import axios from "axios";

const CEUpload = () => {
  const [achievements, setAchievements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [id, setId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    descriptionPoints: [""],
    date: "",
    pdfs: [], // Changed from images to pdfs
  });
  const [uploadedFiles, setUploadedFiles] = useState([]); // For uploaded PDF file names
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

  // Handle adding PDFs
  const handleAddPdf = (e) => {
    const files = Array.from(e.target.files);
    const updatedPdfs = [...formValues.pdfs, ...files];
    setFormValues({ ...formValues, pdfs: updatedPdfs });

    // Generate file names for display
    const fileNames = files.map((file) => file.name);
    setUploadedFiles([...uploadedFiles, ...fileNames]);
  };

  // Handle deleting a PDF
  const handleDeletePdf = (index) => {
    const updatedPdfs = formValues.pdfs.filter((_, i) => i !== index);
    setFormValues({ ...formValues, pdfs: updatedPdfs });

    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formValues.title.trim() ||
      formValues.descriptionPoints.some((point) => !point.trim()) ||
      !formValues.date ||
      formValues.pdfs.length === 0
    ) {
      setErrors({
        submit: "Please fill in all fields and upload at least one PDF.",
      });
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("date", formValues.date);
    formValues.descriptionPoints.forEach((point) => {
      formData.append("descriptionPoints", point);
    });
    formValues.pdfs.forEach((pdf) => {
      formData.append("pdfs", pdf); // 'pdfs' should be the field name expected by the backend
    });

    try {
      const url =
        editIndex === null
          ? `http://localhost:3000/api/ce/createenglish`
          : `http://localhost:3000/api/ce/editenglish/${id}`;
      const response = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      setRefresh(true);

      // Reset form
      setFormValues({
        title: "",
        descriptionPoints: [""],
        date: "",
        pdfs: [],
      });
      setUploadedFiles([]);
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
      pdfs: [],
    });
    setUploadedFiles([]);
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
    // setFormValues({
    //   title: achievement.title,
    //   descriptionPoints: achievement.description,
    //   date: achievement.date,
    //   // pdfs: [...achievement.pdfs], // Adjust based on how PDFs are stored
    // });
    console.log(achievement.pdfs);
    // setUploadedFiles([...achievement.pdfs.map((pdf) => pdf.name)]); // Assuming 'pdfs' have a 'name' property
    setEditIndex(index);
    setShowForm(true);
    setErrors({});
    setSuccessMessage("");
  };

  // Handle deleting an achievement
  const handleDeleteAchievement = async (index) => {
    const id = achievements[index]._id;
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/ce/deletenglish/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setRefresh(true);
  };

  // Handle form cancellation
  const handleCancel = () => {
    setShowForm(false);
    setFormValues({
      title: "",
      descriptionPoints: [""],
      date: "",
      pdfs: [],
    });
    setUploadedFiles([]);
    setEditIndex(null);
    setErrors({});
    setSuccessMessage("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/ce/fetchenglish`,
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

  const downloadPdf = (pdfUrl) => {
    // Create a hidden link element
    const link = document.createElement("a");
    link.href = pdfUrl;

    // Optional: Set the 'download' attribute if you want to provide a default filename
    link.download = "document.pdf"; // You can change the filename if desired

    // Append the link to the body (required for some browsers)
    document.body.appendChild(link);

    // Trigger the download by simulating a click
    link.click();

    // Clean up: Remove the link after triggering the download
    document.body.removeChild(link);
  };

  return (
    <div className="achievements-container">
      <button className="add-achievement-btn" onClick={handleAddAchievement}>
        Add New
      </button>

      {/* Achievement List */}
      <div className="achievements-list">
        {achievements?.map((achievement, index) => (
          <div className="achievement-card" key={index}>
            <div className="achievement-header">
              <h3>{achievement?.title}</h3>
              <p>{achievement?.date}</p>
            </div>
            <ul className="achievement-description">
              {achievement?.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
            <div className="achievement-pdfs">
              {achievement?.pdfs?.map((pdf, i) => (
                <div className="pdf-container" key={i}>
                  {console.log(pdf)}
                  <a href={pdf} target="_blank" rel="noopener noreferrer">
                    Pdf Link
                  </a>
                  <button
                    type="button"
                    className="download-btn"
                    onClick={() => downloadPdf(pdf)}
                  >
                    Download
                  </button>
                  {/* Optionally, add delete functionality for PDFs if needed */}
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
              value={formValues?.title}
              onChange={handleInputChange}
              placeholder="Achievement Title"
              required
            />
            <input
              type="date"
              name="date"
              value={formValues?.date}
              onChange={handleInputChange}
              required
            />

            {formValues?.descriptionPoints?.map((point, index) => (
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
                {formValues?.descriptionPoints?.length > 1 && (
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

            <div className="pdf-upload">
              <label>Upload PDFs:</label>
              <input
                type="file"
                multiple
                accept="application/pdf"
                onChange={handleAddPdf}
                required={formValues?.pdfs?.length === 0} // Make it required only if no PDFs are uploaded
              />
            </div>

            {/* Uploaded PDFs List */}
            <div className="uploaded-pdfs">
              {uploadedFiles?.map((fileName, index) => (
                <div className="uploaded-pdf" key={index}>
                  <span>{fileName}</span>
                  <button
                    type="button"
                    className="delete-pdf-btn"
                    onClick={() => handleDeletePdf(index)}
                  >
                    <b>X</b>
                  </button>
                </div>
              ))}
            </div>

            {errors?.submit && (
              <div className="error-message">{errors?.submit}</div>
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

export default CEUpload;
