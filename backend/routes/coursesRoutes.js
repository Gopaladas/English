import express from "express";

import authAdmin from "../middleware/authAdmin.js";

import {
  createCourse,
  editCourse,
  updateChapters,
  deleteCourse,
  deleteChapter,
  fetchingCourses,
  fetchingPdf,
} from "../controllers/coursesControl.js";
import upload from "../utils/pdfUpload.js";
const Routes = express.Router();


Routes.post("/createcourse", upload.fields([
  { name: "pdfUrl", maxCount: 1 }, // Accept one file for "pdfUrl"
  { name: "imageUrl", maxCount: 1 }, // Accept one file for "imageUrl"
]), createCourse);

Routes.post("/editcourse", editCourse);

Routes.post("/addLinks", updateChapters);

Routes.post("/deletecourse", deleteCourse);

Routes.post("/deletechapter", deleteChapter);

Routes.get("/fetchcourses", fetchingCourses);

Routes.get("/fetchpdf", fetchingPdf);

export default Routes;
