import express from "express";
// import { Router } from 'express';
import Admin from "../models/admin.js";
import Faculty from "../models/faculty.js";
import upload from "../utils/pdfUpload.js";

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
  deleteFaculty,
  singleEventData,
} from "../controllers/Admin.js";

import authadmin from "../middleware/authAdmin.js";

Router.route("/").post(createAdmin);
Router.post("/adminlogin", adminLogin);
Router.post("/adminlogout", adminLogout);
Router.get("/admindata/:id", authadmin, admindata);
Router.post("/changepassword", authadmin, changepass);
Router.post("/createFaculty", authadmin, createFaculty);
Router.get("/eachfacultydetails/:id", eachfacultydetails);
Router.post("/updateAdmin", authadmin, upload.fields([
  { name: "resumeUrl", maxCount: 1 }, // Accept one file for "pdfUrl"
  { name: "imageUrl", maxCount: 1 }, // Accept one file for "imageUrl"
]),updateAdmin);
Router.post("/uploadimages", authadmin,upload.array("images",10) ,uploadImages);
Router.post("/addimages/:id", authadmin,upload.array("images",10), addImages);
Router.get("/imagesdata", imagesData);
Router.delete("/deletefaculty/:id", authadmin, deleteFaculty);
Router.get("/singleEventData/:id", singleEventData);
// Backend - Check login status route

Router.get("/isLoggedIn", authadmin, async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    let existUser = await Faculty.findById(id);
    let role = "user";
    // console.log("faculty : ", existUser);
    if (!existUser) {
      existUser = await Admin.findById(id).select("-password");
      role = "admin";
    }
    // console.log("Admin : ", existUser);
    if (existUser) {
     return res.json({
        isLoggedIn: true,
        user: {
          id: existUser._id,
          role: role,
          name: existUser?.username || existUser.name,
          email: existUser.email,
        },
      });
    } else {
      // If no user is found, return a response indicating the user is not logged in
     return res.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.log(error);
    // debugging
   return res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default Router;
