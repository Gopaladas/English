import express from "express";
import authUser from "../middleware/authAdmin.js";
const Router = express.Router();

import {
  facultydetails,
  facultyLogin,
  facultyLogout,
  updateFaculty,
} from "../controllers/Faculty.js";

Router.post("/facultyLogin", facultyLogin);
Router.post("/facultyLogout", authUser, facultyLogout);
Router.get("/facultydetails", facultydetails);
Router.post("/updatedatails", authUser, updateFaculty);
export default Router;
