import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel"; // Import carousel component

// Import images from the assets folder
import image1 from "../assets/image1.jpeg";
import image2 from "../assets/image2.jpeg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.jpeg";
import image6 from "../assets/image6.jpg";

const HomePage = () => {
  return (
    <div className="p-0">
      {/* Marquee-style heading */}
      <marquee behavior="scroll" direction="right" scrollamount="8" className="text-4xl font-bold py-2">
        English Department
      </marquee>

      {/* Image Carousel */}
      <div className="my-4">
        <Carousel showThumbs={false} autoPlay infiniteLoop>
          {/* Use imported images with responsive styling */}
          <div>
            <img
              src={image1}
              alt="English Department Image 1"
              className="w-full h-auto max-h-[70vh] object-cover"
            />
          </div>
          <div>
            <img
              src={image2}
              alt="English Department Image 2"
              className="w-full h-auto max-h-[70vh] object-cover"
            />
          </div>
          <div>
            <img
              src={image3}
              alt="English Department Image 3"
              className="w-full h-auto max-h-[70vh] object-cover"
            />
          </div>
          <div>
            <img
              src={image4}
              alt="English Department Image 4"
              className="w-full h-auto max-h-[70vh] object-cover"
            />
          </div>
          <div>
            <img
              src={image5}
              alt="English Department Image 5"
              className="w-full h-auto max-h-[70vh] object-cover"
            />
          </div>
          <div>
            <img
              src={image6}
              alt="English Department Image 6"
              className="w-full h-auto max-h-[70vh] object-cover"
            />
          </div>
        </Carousel>
      </div>

      {/* Content Section */}
      <div className="text-left p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">About the English Department</h2>

        <div className="border-t-4 border-gray-300 my-6"></div>
        <p>
          The English Department at RGUKT Basar was established in 2008. It has been instrumental in promoting linguistic proficiency and literary appreciation among students. Our curriculum focuses on both modern and classical literature, offering a broad understanding of language, culture, and history.
        </p>
        <p className="mt-4">
          The department also organizes workshops, seminars, and events that provide a platform for students to showcase their skills in writing, debate, and drama. Join us to explore the world of English literature and improve your communication skills.
        </p>
      </div>

      {/* Additional Content */}
      <div className="text-left p-6 rounded-lg shadow-md">
        <p>
          The Department of English has been one of the foremost and prolific departments at Dyal Singh College since its inception. Initially, the department started with less than 10 teachers. As of now, the department has 19 full-time teachers comprising 1 Professor, 7 Associate Professors, 10 Assistant Professors, and 1 Assistant Professor (Ad-hoc). Along with the existing faculties, in every academic session, the department also has to appoint a few Guest faculties to cater to a sanctioned strength of 77 students in two sections of BA (Hons) English. Every year, the number of students taking admission in English Hons goes up to 90.
        </p>
        <p className="mt-4">
          The department has always believed in offering an array of courses to students taking admission in the course. The rubric of the curriculum primarily ranges from canonical texts to new literary theories. At times, textual discussions are well supported by movie screenings. As a department, our primary duties have been to foster literary excellence amongst students, inculcate language proficiency and contribute to new literary awareness and theories. The department has always aimed at providing critical insights to literary texts as well as helping in understanding the relevance of any paper in the context of contemporaneity.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
