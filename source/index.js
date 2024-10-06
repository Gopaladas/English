import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js";
// import Routes from "./routes/custRoutes.js";
import Routes from "./routes/coursesRoutes.js";
import LibraryRoutes from "./routes/libraryRoutes.js";
import AchieveRoutes from "./routes/acieveRoutes.js";

const app=express();

dotenv.config();

app.use(express.json());

app.use(express.urlencoded({extended:true}));
connectDb();
const port =  process.env.PORT||3000;

app.use("/api/courses",Routes);
app.use("/api/library",LibraryRoutes);
app.use("/api/achievements",AchieveRoutes);


app.listen(port,()=>{console.log(`server running at ${port}`)});