import mongoose from "mongoose";
import Library from "../models/Library.js";
import cloudinary from "cloudinary";
cloudinary.v2;

function checkimgValidity(supportedTypes, type) {
  return supportedTypes.includes(type);
}

async function uploadToCloud(filesdata, path) {
  const { options } = path;
  filesdata.resource_type = "auto";
  return await cloudinary.uploader.upload(filesdata.tempFilePath, options);
}

const createLibrary = async (req, res) => {
  const { type, title } = req.body;

  const img = req.files?.img;
  const pdf = req.files?.pdf;

  console.log("img , pdf", img, pdf);

  if (!type || !img || !title || !pdf) {
    return res.send(
      "Fill all the required fields: librarytitle, image, title, pdf."
    );
  }

  const supportedTypes = ["jpeg", "jfif", "jpg", "png", "webp"];
  const resumesupportTypes = ["pdf"];

  const imgtype = img.name.split(".")[1].toLowerCase();
  const pdfType = pdf.name.split(".")[1].toLowerCase();

  const isImgValid = checkimgValidity(supportedTypes, imgtype);
  const isPdfValid = checkimgValidity(resumesupportTypes, pdfType);

  if (!isImgValid || !isPdfValid) {
    res.json({ success: false, message: "the file type is not correct" });
  }

  const imgUrl = await uploadToCloud(img, "/library");
  const pdfUrl = await uploadToCloud(pdf, "/library");
  console.log(imgUrl?.secure_url, pdfUrl?.secure_url);
  try {
    const data = await Library.create({
      type,
      image: imgUrl.secure_url,
      title,
      pdf: pdfUrl.secure_url,
    });
    console.log(data);
    res
      .status(201)
      .json({ success: true, message: "Library created successfully." });
  } catch (error) {
    console.error("Error creating library:", error);
    res.status(500).send("Server error.");
  }
};

const editLibrary = async (req, res) => {
  const { id, changeLibraryType, changeImage, changeTitle, changePdf } =
    req.body;

  if (!id) {
    return res.status(400).send("ID is required to find the course.");
  }

  if (!changeTitle && !changeImage && !changePdf && !changeLibraryType) {
    return res
      .status(400)
      .send(
        "At least one field (changeTitle,changeLibraryType, changeImage, changePdf) must be provided for update."
      );
  }

  try {
    const library = await Library.findById(id);
    if (!library) {
      return res.status(404).send("Library not found.");
    }

    if (changeLibraryType) {
      library.librarytype = changeLibraryType;
    }
    if (changeTitle) {
      library.title = changeTitle;
    }
    if (changeImage) {
      library.image = changeImage;
    }
    if (changePdf) {
      library.pdf = changePdf;
    }

    await library.save();

    res.status(200).json({
      librarytype: library.librarytype,
      title: library.title,
      image: library.image,
      pdf: library.pdf,
    });
  } catch (error) {
    res.status(500).send("Server error.");
  }
};

const deleteLibrary = async (req, res) => {
  const { id } = req.body;

  try {
    const library = await Library.findOneAndDelete(id);
    if (!library) {
      return res.status(404).send("Library not found.");
    }

    res.status(200).send("Library deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

const fetchingLibrary = async (req, res) => {
  try {
    const library = await Library.find({});

    res.status(200).json({
      success: true,
      data: library,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

const fetchingPdf = async (req, res) => {
  const { id } = req.body;

  // Check if id is provided
  if (!id) {
    return res.status(400).send("ID must be provided.");
  }

  try {
    const library = await Library.findById(id);

    if (!library) {
      return res.status(404).send("Library not found.");
    }

    if (!library.pdf) {
      return res.status(404).send("No PDF found for this library.");
    }

    // Set the appropriate headers for downloading the PDF
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", `attachment; filename=course_${id}.pdf`);

    // Send the PDF content as the response
    res.send(library.pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error.");
  }
};

export {
  createLibrary,
  editLibrary,
  deleteLibrary,
  fetchingLibrary,
  fetchingPdf,
};
