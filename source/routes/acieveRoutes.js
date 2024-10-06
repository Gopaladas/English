import express from "express";

import { createAchievement,editAchievement,getAchievements,deleteAchievement} from "../controllers/achieveControl.js";

const Routes = express.Router();

Routes.post("/createachievement",createAchievement);
Routes.post("/editachievement",editAchievement);

Routes.post("/deleteachievement",deleteAchievement);

 Routes.get("/fetchachievement",getAchievements);




export default Routes;