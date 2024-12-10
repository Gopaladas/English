import Achievement from "../models/Achievements.js";
import cloudinary from "cloudinary";
cloudinary.v2;

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
   console.log(req?.files);
  // let images = req?.files?.images;

  const images = req?.files.map((file) => file.filename);
    console.log("Uploaded images: ", images);


  console.log(title, descriptionPoints);
  //   console.log(images);
  // if (!Array.isArray(images)) {
  //   images = [images];
  // }
  // console.log(images);

  if (!title || !descriptionPoints ) {
    return res
      .status(400)
      .json({ message: "Title and description (array) are required." });
  }

  // const uploadedImgUrls = [];

  // for (let image of images) {
  //   const supportedTypes = ["jpeg", "jpg", "png", "webp"];

  //   const type = image.name.split(".")[1].toLowerCase();

  //   const isValidimage = checkimgValidity(type, supportedTypes);
  //   console.log(isValidimage);
  //   if (!isValidimage) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "image is not valid",
  //     });
  //   }

  //   const image_res = await uploadImgToCloud(image, "/gallery");
  //   console.log(image_res.secure_url);
  //   uploadedImgUrls.push(image_res.secure_url);
  // }

  try {
    const newAchievement = new Achievement({
      title,
      description: descriptionPoints,
      images,
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

  let images = req?.files?.images;

  if (!Array.isArray(images)) {
    images = [images];
  }

  const uploadedImgUrls = [];

  for (let image of images) {
    const supportedTypes = ["jpeg", "jpg", "png", "webp"];

    const type = image.name.split(".")[1].toLowerCase();

    const isValidimage = checkimgValidity(type, supportedTypes);

    if (!isValidimage) {
      return res.status(400).json({
        success: false,
        message: "image is not valid",
      });
    }

    const image_res = await uploadImgToCloud(image, "/gallery");
    console.log(image_res.secure_url);
    uploadedImgUrls.push(image_res.secure_url);
  }

  try {
    // Return success response
    const response = await Achievement.findByIdAndUpdate(id, {
      $set: {
        title: title,
      },
      $push: {
        description: { $each: description ? [...description] : [] },
        images: { $each: uploadedImgUrls ? [...uploadedImgUrls] : [] },
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
    const achievements = await Achievement.find();

    // Send the achievements as a response
    res.status(200).json({ achievements });
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const deleteAchievement = async (req, res) => {
//   const { id } = req.params;
//   console.log("id : ",id);
//   try {
//     const achieve = await Achievement.findOneAndDelete({id});
//     if (!achieve) {
//       return res.status(404).send("Achievement not found.");
//     }

//     res.status(200).send("Achievement deleted successfully.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Server error.");
//   }
// };
const deleteAchievement = async (req, res) => {
  const { id } = req.params; // Extract the id from request parameters
  console.log("Deleting achievement with id:", id);

  try {
    // Use _id since Mongoose stores document IDs in this field
    const achieve = await Achievement.findByIdAndDelete(id);

    if (!achieve) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Achievement deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting achievement:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting achievement.",
    });
  }
};


export {
  createAchievement,
  editAchievement,
  getAchievements,
  deleteAchievement,
};
