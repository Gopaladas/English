import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app = express();

dotenv.config();
app.use(cookieParser());

//app instance
const frontendUrl = "http://localhost:5173"; // Your frontend URL

app.use(
  cors({
    origin: frontendUrl, // Only allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.json());
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
import CourseRoutes from "./routes/coursesRoutes.js";
import LibraryRoutes from "./routes/libraryRoutes.js";
// import GalleryRoutes from "./routes/galleryroutes.js";

app.use("/api/admin", AdminRoutes);
app.use("/api/faculty", FacultyRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/library", LibraryRoutes);
// app.use("/api/gallery")

//port setup
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server is running at port : ${PORT}`));
