import express from "express";
import authadmin from "../middleware/authAdmin.js";
import upload from "../utils/pdfUpload.js";

import {
  createAchievement,
  editAchievement,
  getAchievements,
  deleteAchievement,
} from "../controllers/achieveControl.js";

const Routes = express.Router();

Routes.post("/createachievement", authadmin,upload.array("images",10), createAchievement);
Routes.post("/editachievement/:id", authadmin, editAchievement);

Routes.delete("/deleteachievement/:id", authadmin, deleteAchievement);

Routes.get("/fetchachievement", getAchievements);

export default Routes;
