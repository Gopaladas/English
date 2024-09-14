import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

dotenv.config();
//app instance
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

//connectDB
import connectDB from "./config/db.js";
connectDB();
//connectcloud
import cloudConnect from "./config/cloud.js";
cloudConnect();

//routes connection
import AdminRoutes from "./routes/adminroutes.js";
import FacultyRoutes from "./routes/facultyroutes.js";
// import GalleryRoutes from "./routes/galleryroutes.js";

app.use("/api/admin", AdminRoutes);
app.use("/api/faculty", FacultyRoutes);
// app.use("/api/gallery")

//port setup
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server is running at port : ${PORT}`));
