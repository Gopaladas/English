import cloudinary from "cloudinary";
cloudinary.v2;
import CE from "../models/CE.js";

function checkimgValidity(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadImgToCloud(adminimg, path) {
  const options = { path };
  adminimg.resource_type = "auto";
  return await cloudinary.uploader.upload(adminimg.tempFilePath, options);
}

const createAchievement = async (req, res) => {
  const { title, descriptionPoints } = req.body;

  let pdfs = req?.files?.pdfs;

  console.log(title, descriptionPoints);
  //   console.log(images);
  if (!Array.isArray(pdfs)) {
    pdfs = [pdfs];
  }
  console.log(pdfs);

  if (!title || !descriptionPoints || !pdfs) {
    return res
      .status(400)
      .json({ message: "Title and description (array) are required." });
  }

  const uploadedImgUrls = [];

  for (let pdf of pdfs) {
    const supportedTypes = ["pdf"];

    const type = pdf.name.split(".")[1].toLowerCase();

    const isValidimage = checkimgValidity(type, supportedTypes);
    console.log(isValidimage);
    if (!isValidimage) {
      return res.status(400).json({
        success: false,
        message: "image is not valid",
      });
    }

    const pdf_res = await uploadImgToCloud(pdf, "/gallery");
    console.log(pdf_res.secure_url);
    uploadedImgUrls.push(pdf_res.secure_url);
  }

  try {
    const newAchievement = new CE({
      title,
      description: descriptionPoints,
      pdfs: uploadedImgUrls,
    });

    await newAchievement.save();

    res.status(201).json({
      message: "Achievement created successfully",
      achievement: newAchievement,
    });
  } catch (error) {
    console.error("Error creating achievement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const editAchievement = async (req, res) => {
  const { title, description } = req.body;

  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Achievement ID must be provided." });
  }

  let pdfs = req?.files?.pdfs;

  if (!Array.isArray(pdfs)) {
    pdfs = [pdfs];
  }

  const uploadedImgUrls = [];

  for (let pdf of pdfs) {
    const supportedTypes = ["pdf"];

    const type = pdf.name.split(".")[1].toLowerCase();

    const isValidimage = checkimgValidity(type, supportedTypes);

    if (!isValidimage) {
      return res.status(400).json({
        success: false,
        message: "image is not valid",
      });
    }

    const pdf_res = await uploadImgToCloud(pdf, "/gallery");
    console.log(pdf_res.secure_url);
    uploadedImgUrls.push(pdf_res.secure_url);
  }

  try {
    // Return success response
    const response = await CE.findByIdAndUpdate(id, {
      $set: {
        title: title,
      },
      $push: {
        description: { $each: description ? [...description] : [] },
        pdfs: { $each: uploadedImgUrls ? [...uploadedImgUrls] : [] },
      },
    });
    console.log(response);
    res.status(200).json({
      message: "Achievement updated successfully",
      achievement: response,
    });
  } catch (error) {
    console.error("Error updating achievement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAchievements = async (req, res) => {
  try {
    // Fetch all achievements from the database
    const achievements = await CE.find();

    // Send the achievements as a response
    console.log(achievements);
    res.status(200).json({ achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAchievement = async (req, res) => {
  const { id } = req.body;

  try {
    const achieve = await CE.findOneAndDelete(id);
    if (!achieve) {
      return res.status(404).send("Achievement not found.");
    }

    res.status(200).send("Achievement deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

export {
  createAchievement,
  editAchievement,
  getAchievements,
  deleteAchievement,
};
