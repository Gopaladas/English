import React, { useEffect, useState } from "react";
import "./Library.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { startloading, stoploading } from "../store/auth/authSlice";
import { startloading,stoploading } from "../../../store/auth/authSlice";
// import Loader from "./Admin/Loader/Loader";
import Loader from "../Loader/Loader";

const Library = () => {
  const { isLoggedin, user, isloading ,backend_url} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    type: "stories",
    title: "",
  });

  const [img, setImg] = useState(null);
  const [pdf, setPdf] = useState(null);

  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handlePdfChange = (e) => {
    setPdf(e.target.files[0]);
  };

  const openFormForNewBook = () => {
    setShowForm(true);
  };
  const [books, setBooks] = useState({
    stories: [],
    novels: [],
    journals: [],
    newspapers: [],
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (for both add and edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { type, title } = formData;

    const LibraryData = new FormData();

    LibraryData.append("type", type);
    LibraryData.append("title", title);
    LibraryData.append("img", img);
    LibraryData.append("pdf", pdf);

    // Prepare the updated book object
    try {
      dispatch(startloading());
      const res = await axios.post(
        `${backend_url}/api/library/createlibrary`,
        LibraryData,
        {
          withCredentials: true,
        }
      );

      console.log(res);
      if (res.data.success === true) {
        setTrigger(true);
      }
    } catch (error) {
      console.log(error);
    }finally{
      dispatch(stoploading());
    }

    // const newBook = {
    //   title,
    //   img: img ? URL.createObjectURL(img) : books[type][editing?.index]?.img,
    //   pdf: pdf ? URL.createObjectURL(pdf) : books[type][editing?.index]?.pdf,
    // };

    // if (editing === null) {
    //   setBooks((prevBooks) => ({
    //     ...prevBooks,
    //     [type]: [...prevBooks[type], newBook],
    //   }));
    // } else {
    //   const updatedBooks = books[type].map((book, index) =>
    //     index === editing.index ? newBook : book
    //   );

    //   setBooks((prevBooks) => ({
    //     ...prevBooks,
    //     [type]: updatedBooks,
    //   }));
    // }

    setShowForm(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/library/fetchlibrary`,
          {
            withCredentials: true,
          }
        );

        console.log(res);

        const setbooksformat = {
          stories: [],
          novels: [],
          journals: [],
          newspapers: [],
        };

        if (res.data.success === true) {
          console.log(res.data.data[0]);
          res.data.data.forEach((item) => {
            console.log(item);
            setbooksformat[item.type].push(item);
          });
        }

        console.log(setbooksformat);
        setBooks(setbooksformat);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [trigger]);

  // Edit book functionality
  const handleEdit = (type, index) => {
    const book = books[type][index];
    setFormData({
      type,
      title: book.title,
      img: null, // Reset file input
      pdf: null, // Reset file input
    });
    setEditing({ type, index });
    setShowForm(true);
  };

  // Delete book functionality
  const handleDelete = async (type, index) => {
    // setBooks((prevBooks) => {
    //   const updatedBooks = { ...prevBooks };
    //   updatedBooks[type].splice(index, 1);

    //   return updatedBooks;
    // });
     console.log(books[type][index]._id);

     try {
      const res = await axios.post(`${backend_url}/api/library/deletelibrary/${books[type][index]._id}`);
      console.log(res);
     } catch (error) {
      console.log(error);
     }
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="library-page">
      <h1>Library Management</h1>
      <button className="add-book-btn" onClick={openFormForNewBook}>
        Add Book
      </button>

      {/* Add/Edit Book Form Overlay */}
      {showForm && (
        <div className="form-overlay">
          <form className="add-book-form" onSubmit={handleFormSubmit}>
            <h2>{editing ? "Edit Book" : "Add Book"}</h2>
            <label>
              Type of Book:
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="stories">Stories</option>
                <option value="novels">Novels</option>
                <option value="journals">Journals</option>
                <option value="newspapers">Newspapers</option>
              </select>
            </label>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Image Upload:
              <input type="file" name="img" onChange={handleImageChange} />
            </label>
            <label>
              PDF Upload:
              <input type="file" name="pdf" onChange={handlePdfChange} />
            </label>
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button type="button" className="cancel-btn" onClick={closeForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Display books */}
      {["stories", "novels", "journals", "newspapers"].map((type) => (
        <div key={type}>
          <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
          <div className="book-grid">
            {books[type].map((book, index) => (
              <div className="book-card" key={index}>
                <img src={`${backend_url}/Files/${book.image}`} alt={book.title} className="book-image" />
                <h3>{book.title}</h3>
                <a href={`${backend_url}/Files/${book.pdf}`} target="_blank" rel="noopener noreferrer">
                  <b>View PDF</b>
                  {console.log(book.pdf)}
                </a>
                <div className="editdelbtn">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(type, index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(type, index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Library;
