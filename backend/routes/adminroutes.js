import express from "express";
// import { Router } from 'express';
import Admin from "../models/admin.js";
import Faculty from "../models/faculty.js";
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
// Backend - Check login status route

Router.get("/isLoggedIn", authadmin, async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    let existUser = await Faculty.findById({ _id: id });
    let role = "user";
    // console.log("faculty : ", existUser);
    if (!existUser) {
      existUser = await Admin.findById({ _id: id }).select("-password");
      role = "admin";
    }
    // console.log("Admin : ", existUser);
    if (existUser) {
      res.json({
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
      res.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.log(error);
    // debugging
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default Router;
