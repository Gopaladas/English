import mongoose from "mongoose";

const AdimnSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("admin", AdimnSchema);

export default Admin;
