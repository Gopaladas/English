import express from "express";
import upload from "../utils/pdfUpload.js";

import { createLibrary,editLibrary,deleteLibrary,fetchingLibrary,fetchingPdf } from "../controllers/libraryControl.js";

const Routes = express.Router();

Routes.post("/createlibrary", upload.fields([
    {name:"pdf",maxCount:1},
    {name:"img",maxCount:1}
]) , createLibrary);
Routes.post("/editlibrary",editLibrary);

Routes.post("/deletelibrary/:id",deleteLibrary);

Routes.get("/fetchlibrary",fetchingLibrary);

Routes.get("/fetchpdf",fetchingPdf);


export default Routes;