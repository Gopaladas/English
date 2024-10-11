import express from "express";
import authadmin from "../middleware/authAdmin.js";

import {
  createAchievement,
  editAchievement,
  getAchievements,
  deleteAchievement,
} from "../controllers/ceControl.js";

const Routes = express.Router();

Routes.post("/createenglish", authadmin, createAchievement);
Routes.post("/editenglish/:id", authadmin, editAchievement);

Routes.delete("/deletenglish/:id", authadmin, deleteAchievement);

Routes.get("/fetchenglish", getAchievements);

export default Routes;
