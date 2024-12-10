import express from "express";
import authadmin from "../middleware/authAdmin.js";
import upload from "../utils/pdfUpload.js";

import {
  createAchievement,
  editAchievement,
  getAchievements,
  deleteAchievement,
} from "../controllers/ceControl.js";

const Routes = express.Router();

Routes.post("/createenglish", authadmin,upload.array("pdfs",10), createAchievement);
Routes.post("/editenglish/:id", authadmin,upload.array("pdfs",10) ,editAchievement);

Routes.delete("/deletenglish/:id", authadmin, deleteAchievement);

Routes.get("/fetchenglish", getAchievements);

export default Routes;
