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

const Routes = express.Router();

Routes.post("/createcourse", createCourse);
Routes.post("/editcourse", editCourse);

Routes.post("/addLinks", updateChapters);

Routes.post("/deletecourse", deleteCourse);

Routes.post("/deletechapter", deleteChapter);

Routes.get("/fetchcourses", fetchingCourses);

Routes.get("/fetchpdf", fetchingPdf);

export default Routes;
