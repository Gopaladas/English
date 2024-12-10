import express from "express";
import authUser from "../middleware/authAdmin.js";
const Router = express.Router();
import upload from "../utils/pdfUpload.js";

import {
  eachfacultydetails,
  facultydetails,
  facultyLogin,
  facultyLogout,
  updateFaculty,
} from "../controllers/Faculty.js";

Router.post("/facultyLogin", facultyLogin);
Router.post("/facultyLogout", authUser, facultyLogout);
Router.get("/facultydetails", facultydetails);
Router.post("/updatedatails", authUser,upload.fields([{
  name:"resumeUrl",maxCount:1
},{name:"imageUrl",maxCount:1}]), updateFaculty);
Router.get("/eachfacultydetails/:id", eachfacultydetails);
export default Router;
