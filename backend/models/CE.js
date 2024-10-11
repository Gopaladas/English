import mongoose from "mongoose";

const CESchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    pdfs: {
      type: [String],
      required: false,
    },
    createdDate: {
      type: Date,
      default: Date.now, // Automatically set the current date when created
    },
  },
  { timestamps: false }
); // Disable default timestamps, since you're using custom fields

const CE = mongoose.model("Competitive", CESchema);

export default CE;
