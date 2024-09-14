import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures that faculty names are unique
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures that email is unique
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ], // Validates email format
    },
    phone: {
      type: String, // Storing phone as a string to preserve formatting
    },
    qualification: {
      type: String,
    },
    awards: [String],
    achievements: [String],
    contributions: [String],
    specialization: [String],
    resumeUrl: String,
    isFaculty: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Faculty = mongoose.model("Faculty", facultySchema);

export default Faculty;
