import React, { useEffect, useState } from "react";
import "./Bookstudent.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import one from "./book1.jpeg";
import two from "./book2.jpg";
import three from "./book3.jpeg";
import four from "./book4.jpeg";
import five from "./book5.jpeg";
import six from "./book6.jpeg";
import seven from "./book7.jpeg";
import eight from "./book8.jpeg";
import { startloading, stoploading } from "../../../store/auth/authSlice";
import Loader from "../Loader/Loader";

// const initialBooks = [
//   {
//     title: "DIVERSITY & INCLUSION",
//     img: one,
//     link: "/diversity-inclusion",
//   },
//   {
//     title: "CUSTOMER COMMITMENT",
//     img: two,
//     link: "/customer-commitment",
//     headings: ["/linkOne", "linkTwo"],
//   },
//   {
//     title: "PEOPLE CENTRIC",
//     img: three,
//     link: "/people-centric",
//     headings: ["/linkOne", "linkTwo"],
//   },
//   {
//     title: "TEAMWORK & COLLABORATION",
//     img: four,
//     link: "/teamwork-collaboration",
//     headings: ["/linkOne", "linkTwo"],
//   },
//   {
//     title: "TRANSPARENCY & ACCOUNTABILITY",
//     img: five,
//     link: "/transparency-accountability",
//     headings: ["/linkOne", "linkTwo"],
//   },
//   {
//     title: "RESPECT",
//     img: six,
//     link: "/respect",
//     headings: ["/linkOne", "linkTwo"],
//   },
//   {
//     title: "INTEGRITY",
//     img: seven,
//     link: "/integrity",
//     headings: ["/linkOne", "linkTwo"],
//   },
//   {
//     title: "PASSION",
//     img: eight,
//     link: "/passion",
//     headings: ["/linkOne", "linkTwo"],
//   },
// ];

const Bookstudent = () => {
  const { isLoggedin, user, isloading,backend_url } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [coreValues, setCoreValues] = useState([]);

  // const [Books, setBooks] = useState([]);

  // Filter core values based on the search term
  const filteredValues = Array.isArray(coreValues) ? coreValues.filter((value) =>
    value.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const year = queryParams.get("year");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(startloading());
      try {
        const res = await axios.get(
          `${backend_url}/api/courses/fetchcourses?year=${year}`,
          {
            withCredentials: true,
          }
        );

        setCoreValues(res.data);

        console.log(res);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(stoploading());
      }
    };
    fetchData();
  }, [year]);

  return (
    <div className="about-us">
      <div className="header">
        <h2 className="text-black my-5 text-center">ENGLISH BOOKS</h2>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <div className="searchtext">Search</div>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Core Values */}
      {isloading ? (
        <Loader />
      ) : (
        <div className="core-values">
          {filteredValues.map((value, index) => (
            <Link
              to={`/${
                user?.role === "admin" ? "adminMain" : "userMain"
              }/Courses/BookdDtails/${value._id}`}
              state={{ Course: value }}
              key={index}
            >
              <article className="custom-card" key={index}>
                {/* Card Image */}
                <div className="card-image-container">
                {console.log(value.image)}
                  <img
                    className="card-image"
                    src={`${backend_url}/Files/${value.image}`}
                    alt={value.title}
                  />
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <h2 className="card-title">{value.title}</h2>
                  <p className="card-description">{value.description}</p>
                </div>

                {/* CTA Link */}
                <div className="card-link-container">
                  <a
                    className="card-link"
                    href={value.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookstudent;
