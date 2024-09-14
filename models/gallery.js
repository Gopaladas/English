import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  images: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model("gallery", gallerySchema);

export default Gallery;
