import express from "express";

import { createLibrary,editLibrary,deleteLibrary,fetchingLibrary,fetchingPdf } from "../controllers/libraryControl.js";

const Routes = express.Router();

Routes.post("/createlibrary",createLibrary);
Routes.post("/editlibrary",editLibrary);

Routes.post("/deletelibrary",deleteLibrary);

Routes.get("/fetchlibrary",fetchingLibrary);

Routes.get("/fetchpdf",fetchingPdf);


export default Routes;