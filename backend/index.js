import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app = express();

dotenv.config();

// const corsConfig = {
//   origin : "*",
//   credentials : true,
//   methods : ["GET","POST","PUT","DELETE"],
// }

// app.options("",cors(corsConfig));

// app.use(cors(corsConfig));

app.use(cookieParser());

//app instance
const frontendUrl = "https://english-2kuj-frontend.vercel.app"; // Your frontend URL

app.use(
  cors({
    origin: [frontendUrl],
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  })
);

// app.options("",cors());
// app.use(cors());
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
import AchievementRoutes from "./routes/acieveRoutes.js";
import CERoutes from "./routes/ceroutes.js";
// import GalleryRoutes from "./routes/galleryroutes.js";

app.use("/api/admin", AdminRoutes);
app.use("/api/faculty", FacultyRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/library", LibraryRoutes);
app.use("/api/achivement", AchievementRoutes);
app.use("/api/ce", CERoutes);
// app.use("/api/gallery")

//port setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running at port : ${PORT}`));
