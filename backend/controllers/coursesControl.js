import mongoose from "mongoose";
import multer from "multer";
// import {CloudinaryStorage} from "multer-storage-cloudinary";
import Courses from "../models/Courses.js";
import cloudinary from "cloudinary";
cloudinary.v2;

function checkValidity(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadToCloud(courseimg, path) {
  const options = { path };
  courseimg.resource_type = "auto";
  return await cloudinary.uploader.upload(courseimg.tempFilePath, options);
}

async function pdfUploadToCloud(courseimg, folderPath) {
  const options = {
    folder:folderPath,  // Optional: Organize files into a specific folder
    format : async () => "pdf",
  };
  courseimg.resource_type = "raw";
  return await cloudinary.uploader.upload(courseimg.tempFilePath, options);
}


const createCourse = async (req, res) => {
  let { year, title, chapters } = req.body;

  const courseImg = req.files?.imageUrl[0];
  const coursePdf = req.files?.pdfUrl[0];

  console.log(year, title, chapters, courseImg, coursePdf);
  if (!year || !title || !coursePdf || !courseImg) {
    return res.send("Fill all the required fields: year, title, image, pdf.");
  }

  if (chapters && !Array.isArray(chapters)) {
    // return res.send("Chapters must be an array.");
    chapters = [chapters];
  }

  chapters = JSON.parse(chapters);
  if (chapters) {
    for (let chapter of chapters) {
      console.log(chapter);
      //   chapter = JSON.parse(chapter);
      if (!chapter.chapter || typeof chapter.chapter !== "string") {
        return res.send(
          "Each chapter object must have a 'chapter' field of type string."
        );
      }

      if (chapter.link && typeof chapter.link !== "string") {
        return res.send("If provided, 'link' must be a string.");
      }
    }
  }

  // const supportedTypes = ["jpeg", "jpg", "webp", "png"];
  // const resumesupportTypes = ["pdf"];
  
  // const type = courseImg.originalname.split(".")[1].toLowerCase();
  // const pdfType = coursePdf.originalname.split(".")[1].toLowerCase();
  // console.log(type,pdfType);
  // const isValidImage = checkValidity(type, supportedTypes);
  // const isValidPdf = checkValidity(pdfType, resumesupportTypes);
  // if (!isValidImage) {
  //   return res.json({
  //     success: false,
  //     message: "image is not valid",
  //   });
  // }

  // if (!isValidPdf) {
  //   return res.json({
  //     success: false,
  //     message: "pdf is not valid",
  //   });
  // }

  // const imgres = await uploadToCloud(courseImg, "/courses");
  // const pdfres = await pdfUploadToCloud(coursePdf, "/coursePdf");

  try {
    await Courses.create({
      year,
      title,
      image: req.files.imageUrl[0].filename,
      pdf: req.files.pdfUrl[0].filename,
      chapters: chapters || [],
    });
    res.json({ success: true, message: "Course created successfully." });
  } catch (error) {
    console.error("Error creating course:", error);
    res.send("Server error.");
  }
};

const editCourse = async (req, res) => {
  const { id, changeYear, changeTitle, changeImage, changePdf } = req.body;

  if (!id) {
    return res.status(400).send("ID is required to find the course.");
  }

  if (!changeTitle && !changeImage && !changePdf && !changeYear) {
    return res
      .status(400)
      .send(
        "At least one field (changeTitle, changeImage, changePdf) must be provided for update."
      );
  }

  try {
    const course = await Courses.findById(id);
    if (!course) {
      return res.status(404).send("Course not found.");
    }

    if (changeYear) {
      course.year = changeYear;
    }
    if (changeTitle) {
      course.title = changeTitle;
    }
    if (changeImage) {
      course.image = changeImage;
    }
    if (changePdf) {
      course.pdf = changePdf;
    }

    await course.save();

    res.status(200).json({
      year: course.year,
      title: course.title,
      image: course.image,
      pdf: course.pdf,
      chapters: course.chapters,
    });
  } catch (error) {
    res.status(500).send("Server error.");
  }
};

const updateChapters = async (req, res) => {
  const { id, chapters } = req.body;

  if (!id || !Array.isArray(chapters) || chapters.length === 0) {
    return res.status(400).send("ID and chapters array must be provided.");
  }

  try {
    const course = await Courses.findById(id);

    if (!course) {
      return res.status(404).send("Course not found.");
    }

    // Validate and either update or add each chapter
    for (const chapterUpdate of chapters) {
      const { chapter, link } = chapterUpdate;

      if (!chapter || typeof chapter !== "string") {
        return res
          .status(400)
          .send(
            "Each chapter must have a valid 'chapter' field of type string."
          );
      }

      // Find if the chapter exists in the course's chapters array
      const existingChapter = course.chapters.find(
        (ch) => ch.chapter === chapter
      );

      if (existingChapter) {
        // Update the link if the chapter already exists
        if (link && typeof link === "string") {
          existingChapter.link = link;
        } else {
          return res
            .status(400)
            .send("Invalid or missing link for the chapter.");
        }
      } else {
        // If the chapter doesn't exist, add it as a new chapter
        course.chapters.push({ chapter, link: link || "" }); // link is optional, default to empty string if not provided
      }
    }

    await course.save();
    res.status(200).send("Chapters updated/added successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.body;

  try {
    const course = await Courses.findOneAndDelete(id);
    if (!course) {
      return res.status(404).send("Course not found.");
    }

    res.status(200).send("Course deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

const deleteChapter = async (req, res) => {
  const { courseId, chapterId } = req.body;

  if (!courseId || !chapterId) {
    return res.status(400).send("Course ID and Chapter ID must be provided.");
  }

  try {
    // Find the course by its ID
    const course = await Courses.findById(courseId);

    if (!course) {
      return res.status(404).send("Course not found.");
    }

    // Find the index of the chapter to be deleted
    const chapterIndex = course.chapters.findIndex(
      (ch) => ch._id.toString() === chapterId
    );

    if (chapterIndex === -1) {
      return res.status(404).send("Chapter not found.");
    }

    // Remove the chapter from the chapters array
    course.chapters.splice(chapterIndex, 1);

    await course.save();

    res.status(200).send("Chapter deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

const fetchingCourses = async (req, res) => {
  console.log(req);
  const { year } = req.query;
  console.log(year);
  if (!year) {
    return res.status(400).send("Year must be provided.");
  }

  try {
    const courses = await Courses.find({ year })
      .collation({ locale: "en", strength: 2 })
      .sort({ title: 1 });
    console.log(courses);
    if (courses.length === 0) {
      return res.status(200).send("No courses found for the given year.");
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

const fetchingPdf = async (req, res) => {
  const { year } = req.query;

  // Check if id is provided
  if (!year) {
    return res.status(400).send("ID must be provided.");
  }

  try {
    const course = await Courses.find({ year });

    if (!course) {
      return res.status(404).send("Course not found.");
    }

    if (!course.pdf) {
      return res.status(404).send("No PDF found for this course.");
    }

    // Set the appropriate headers for downloading the PDF
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", `attachment; filename=course_${id}.pdf`);

    // Send the PDF content as the response
    res.send(course.pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

export {
  createCourse,
  editCourse,
  updateChapters,
  deleteCourse,
  deleteChapter,
  fetchingCourses,
  fetchingPdf,
};
