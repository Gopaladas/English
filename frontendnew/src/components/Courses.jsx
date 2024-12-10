import React, { useState } from "react";
import "./Courses.css";
import axios from "axios";

const Courses = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [category, setCategory] = useState("P1");
  const [chapters, setChapters] = useState([{ chapter: "", link: "" }]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleFileChange = (e) => setImg(e.target.files[0]);

  const handlePdfChange = (e) => setPdf(e.target.files[0]);

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleLinkChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const addLinkField = () =>
    setChapters([...chapters, { chapter: "", link: "" }]);

  const removeLinkField = (index) => {
    const updatedChapters = chapters.filter((_, i) => i !== index);
    setChapters(updatedChapters);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(img);
    console.log(pdf);
    const formData = new FormData();
    formData.append("year", category);
    formData.append("title", title);
    formData.append("imageUrl", img); // Use img instead of file
    formData.append("pdfUrl", pdf); // Use pdf instead of setPdf
    formData.append("chapters", JSON.stringify(chapters));

    console.log(category , title, img, pdf);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/courses/createcourse",
        formData,
        {

          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res);
      if (res.data.success) {
        setTitle(null);
        setImg(null);
        setPdf(null);
        setCategory("P1");
        setChapters([]);
      }
    } catch (error) {
      console.log(error);
    }

    // Try submitting the form
    // try {
    //   const response = await axios.post("/api/courses", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log("Response:", response.data);
    // } catch (error) {
    //   console.error("Error submitting the form:", error);
    // }
  };
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const formData = new FormData();
  //   formData.append("year", category);
  //   formData.append("title", title);
  //   formData.append("imageUrl", img);
  //   formData.append("pdfUrl", pdf);
  //   formData.append("chapters", JSON.stringify(chapters));
  
  //   // Debugging FormData
  //   for (let [key, value] of formData.entries()) {
  //     console.log(`${key}:`, value);
  //   }
  
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3000/api/courses/createcourse",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     console.log("Response:", res.data);
  //   } catch (error) {
  //     console.error("Error:", error.response?.data || error.message);
  //   }
  // };
  
  return (
    <form onSubmit={handleSubmit} >
      <div className="category-container">
        <label>Course Year:</label>
        <select value={category} onChange={handleCategoryChange} required>
          <option value="P1">PUC-1</option>
          <option value="P2">PUC-2</option>
          <option value="E1">E1</option>
          <option value="E2">E2</option>
          <option value="E3">E3</option>
          <option value="E4">E4</option>
        </select>
      </div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
          required
        />
      </div>
      <div>
        <label>Upload Image:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <div>
        <label>Upload Pdf:</label>
        <input type="file" onChange={handlePdfChange} required />
      </div>
      <div>
        <label>Reference Links:</label>
        {chapters.map((item, index) => (
          <div
            key={index}
            style={{
              marginBottom: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              type="text"
              value={item.chapter}
              onChange={(e) =>
                handleLinkChange(index, "chapter", e.target.value)
              }
              placeholder="Enter heading for the link"
              required
              style={{ marginBottom: "8px" }}
            />
            <input
              type="url"
              value={item.link}
              onChange={(e) => handleLinkChange(index, "link", e.target.value)} // Fix field to "link"
              placeholder="Enter link"
              required
              style={{ marginBottom: "8px" }}
            />
            {chapters.length > 1 && (
              <button type="button" onClick={() => removeLinkField(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addLinkField}>
          Add another link
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Courses;
