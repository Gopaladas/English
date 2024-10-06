import React, { useState } from "react";
import "./AboutUs.css";

import one from "./book1.jpeg";
import two from "./book2.jpg";
import three from "./book3.jpeg";
import four from "./book4.jpeg";
import five from "./book5.jpeg";
import six from "./book6.jpeg";
import seven from "./book7.jpeg";
import eight from "./book8.jpeg";

const initialBooks = [
  {
    title: "DIVERSITY & INCLUSION",
    img: one,
    link: "/diversity-inclusion",
  },
  {
    title: "CUSTOMER COMMITMENT",
    img: two,
    link: "/customer-commitment",
  },
  {
    title: "PEOPLE CENTRIC",
    img: three,
    link: "/people-centric",
  },
  {
    title: "TEAMWORK & COLLABORATION",
    img: four,
    link: "/teamwork-collaboration",
  },
  {
    title: "TRANSPARENCY & ACCOUNTABILITY",
    img: five,
    link: "/transparency-accountability",
  },
  {
    title: "RESPECT",
    img: six,
    link: "/respect",
  },
  {
    title: "INTEGRITY",
    img: seven,
    link: "/integrity",
  },
  {
    title: "PASSION",
    img: eight,
    link: "/passion",
  },
];

const AboutUs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coreValues, setCoreValues] = useState(initialBooks);

  // Function to handle adding a new book
  const addNewBook = () => {
    const newBook = {
      title: "NEW BOOK",
      img: one, // Replace with a relevant image
      link: "/new-book",
    };
    setCoreValues([...coreValues, newBook]);
  };

  // Filter core values based on the search term
  const filteredValues = coreValues.filter((value) =>
    value.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="about-us">
      <div className="header">
        <h2 className="text-black my-5 text-center">ENGLISH BOOKS</h2>

        {/* Button to add a new book */}
        <button className="add-book-button" onClick={addNewBook}>
          Add New Book
        </button>
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
      <div className="core-values">
        {filteredValues.map((value, index) => (
          <article className="card_down" key={index}>
            {/* Image Link */}
            <a href={value.link}>
              <div className="temporary_text">
                <img src={value.img} alt={value.title} />
              </div>
            </a>

            {/* Static Card Content */}
            <div className="card_content_down">
              <span className="card_title_down">{value.title}</span>
              {/* <span className="card_description_down">{value.title}</span> */}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
