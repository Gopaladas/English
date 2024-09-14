import express from "express";
// import { Router } from 'express';

const Router = express.Router();

import {
  createAdmin,
  adminLogin,
  adminLogout,
  admindata,
  changepass,
  createFaculty,
  eachfacultydetails,
  updateAdmin,
  uploadImages,
  addImages,
  imagesData,
} from "../controllers/Admin.js";

import authadmin from "../middleware/authAdmin.js";

Router.route("/").post(createAdmin);
Router.post("/adminlogin", adminLogin);
Router.post("/adminlogout", adminLogout);
Router.get("/admindata", authadmin, admindata);
Router.post("/changepassword", authadmin, changepass);
Router.post("/createFaculty", authadmin, createFaculty);
Router.get("/eachfacultydetails/:id", eachfacultydetails);
Router.post("/updateAdmin", authadmin, updateAdmin);
Router.post("/uploadimages", authadmin, uploadImages);
Router.post("/addimages/:id", authadmin, addImages);
Router.get("/imagesdata", imagesData);

export default Router;
