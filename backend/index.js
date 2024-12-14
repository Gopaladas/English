import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
const app = express();
app.use("/Files",express.static("Files"));

dotenv.config();

// const corsConfig = {
//   origin : "*",
//   credentials : true,
//   methods : ["GET","POST","PUT","DELETE"],
// }

// app.options("",cors(corsConfig));

// app.use(cors(corsConfig));

app.use(cookieParser());
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//app instance
// const frontendUrl = "https://english-2kuj-frontend.vercel.app"; // Your frontend URL
const frontendUrl ="https://english-2sty.vercel.app";
app.use(
  cors({
    origin: [frontendUrl], 
    methods: ["GET","HEAD", "POST", "PUT", "DELETE","OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
     credentials: true,
  })
);

app.use((req, res, next) => {
  // Set the Access-Control-Allow-Origin header to allow specific frontend domain
  res.header("Access-Control-Allow-Origin", "https://english-2sty.vercel.app"); // Replace with your actual frontend domain

  // Specify allowed methods
  res.header("Access-Control-Allow-Methods", "GET,"HEAD", POST, PUT, DELETE, OPTIONS");

  // Specify allowed headers
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  // Allow credentials (cookies, authorization headers, etc.)
  res.header("Access-Control-Allow-Credentials", "true");

  // If the request is a preflight (OPTIONS), end it quickly
  // if (req.method === "OPTIONS") {
  //   return res.status(204).end();
  // }

  // Proceed to the next middleware or route handler
  next();
});


app.options('*', cors());

// app.options("",cors());
// app.use(cors());
app.use(express.json());
// app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

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
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is running at port : ${PORT}`));
