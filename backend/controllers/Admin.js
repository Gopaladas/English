import Admin from "../models/admin.js";
import Faculty from "../models/faculty.js";
// import FacultyMain from "../models/facultymain.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import cloudinary from "cloudinary";
cloudinary.v2;

import Gallery from "../models/gallery.js";

const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const existAdmin = await Admin.findOne({ email });

  const anyAdmin = await Admin.find({});

  if (existAdmin) {
    return res
      .status(400)
      .json({ success: false, message: "Alredy the admin is exist" });
  }

  if (anyAdmin.length > 0) {
    return res.status(400).json({
      success: false,
      message: "The admin exist ,we can't create another admin",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const response = await Admin.create({
      username,
      email,
      password: hashPassword,
    });

    const token = createToken(res, response._id);
    if (token) {
      res.status(201).json({
        success: true,
        message: {
          id: response._id,
          username: response.username,
          email: response.email,
          token: token,
        },
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Data not submitted successfully",
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login : ", email, password);
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    let existUser = await Faculty.findOne({ email });
    let role = "user";

    if (!existUser) {
      existUser = await Admin.findOne({ email });
      role = "admin";
    }

    if (existUser) {
      const isValidPassword = await bcrypt.compare(
        password,
        existUser.password
      );

      if (isValidPassword) {
        const token = createToken(res, existUser._id);
        res.json({
          isLoggedIn: true,
          user: {
            id: existUser._id,
            username: existUser.username,
            email: existUser.email,
            role: role,
            token: token,
          },
        });
      } else {
        res.status(400).json({
          isLoggedIn: false,
          message: "Invalid password",
        });
      }
    } else {
      res.status(400).json({
        isLoggedIn: false,
        message: "not exist",
      });
    }
  } catch (error) {
    res.status(400).json({
      isLoggedIn: false,
      message: "login unsuccessfull",
    });
  }
};

const adminLogout = async (req, res) => {
  try {
    // Clear the "token" cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Ensure it's sent over HTTPS
      sameSite: "None",
      // sameSite: "strict",
      path: "/",
    });
    console.log("logout");
    // Send a success response
    res
      .status(200)
      .json({ isLoggedIn: false, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res
      .status(500)
      .json({ isLoggedIn: true, message: "Logout not successful" });
  }
};

const admindata = async (req, res) => {
  try {
    console.log("req_id", req.user);
    let admin = await Admin.findById(req.user.id).select("-password");
    console.log("hey", admin);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }
    res.json({
      success: true,
      user: {
        id: admin?._id,
        username: admin?.username,
        awards: admin?.awards,
        achievements: admin?.achievements,
        contributions: admin?.contributions,
        specialization: admin?.specialization,
        bio: admin?.bio,
        imageUrl: admin?.imageUrl,
        resumeUrl: admin?.resumeUrl,
        isAdmin: true,
        email: admin?.email,
        role: "admin",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const changepass = async (req, res) => {
  try {
    const { username, password } = req.body;
    const id = req.user.id;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.findByIdAndUpdate(
      id,
      {
        username: username,
        password: hashedPassword,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        isAdmin: true,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

function checkimgValidity(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadImgToCloud(adminimg, path) {
  const options = { path };
  adminimg.resource_type = "auto";
  return await cloudinary.uploader.upload(adminimg.tempFilePath, options);
}

async function uploadPdfToCloud(adminPdf, path) {
  const options = { path };
  adminPdf.resource_type = "raw";
  adminPdf.sign_url = true;
  return await cloudinary.uploader.upload(adminPdf.tempFilePath, options);
}

const updateAdmin = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);
    const { name, designation, bio, email, phone, qualification } = req.body;

    console.log("req :", req.body);
    const awards = JSON.parse(req.body.awards);
    const achievements = JSON.parse(req.body.achievements);
    const contributions = JSON.parse(req.body.contributions);
    const specialization = JSON.parse(req.body.specialization);

    const adminImg = req.files?.imageUrl;
    const resumeUrl = req.files?.resumeUrl;

    console.log(adminImg, resumeUrl);

    const supportedTypes = ["jpeg", "jpg", "png", "webp"];
    const resumesupportTypes = ["pdf"];

    const type = adminImg.name.split(".")[1].toLowerCase();
    const resumeType = resumeUrl.name.split(".")[1].toLowerCase();

    const isSupported = checkimgValidity(type, supportedTypes);
    const isResumeSupported = checkimgValidity(resumeType, resumesupportTypes);

    if (!isSupported) {
      return res.status(400).json({
        success: false,
        message: "Invalid image type",
      });
    }

    if (!isResumeSupported) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume type",
      });
    }
    console.log(isResumeSupported, isSupported);
    const image_res = await uploadImgToCloud(adminImg, "/adminimage");
    const resume_res = await uploadPdfToCloud(resumeUrl, "/adminimage");
    console.log(image_res.secure_url, resume_res.secure_url);
    const admin = await Admin.findByIdAndUpdate(
      id,
      {
        $set: {
          username: name,
          designation: designation,
          imageUrl: image_res.secure_url,
          bio: bio,
          email: email,
          phone: phone,
          qualification: qualification,
          resumeUrl: resume_res.secure_url,
        },
        $push: {
          awards: { $each: awards ? [...awards] : [] },
          achievements: { $each: achievements ? [...achievements] : [] },
          contributions: { $each: contributions ? [...contributions] : [] },
          specialization: { $each: specialization ? [...specialization] : [] },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not updated" });
    }

    console.log(admin);
    return res.status(201).json({
      success: true,
      message: "Admin details updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "error while updating the Admin",
    });
  }
};

const createFaculty = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Ensure all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check if the faculty name or email already exists
    const existingFaculty = await Faculty.findOne({
      $or: [{ name }, { email }],
    });

    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: "Faculty with this name or email already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new faculty
    const response = await Faculty.create({
      name: name,
      email,
      password: hashedPassword,
    });

    // Return a success response
    return res.status(201).json({
      success: true,
      message: {
        id: response._id,
        name: response.name,
        email: response.email,
      },
    });
  } catch (error) {
    // Log the error and return a 500 status code
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Error while creating the faculty",
    });
  }
};

const deleteFaculty = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const faculty = await Faculty.findByIdAndDelete({ _id: id });
    console.log(faculty);
    return res.json({ success: true, message: "faculty deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error while deleting" });
  }
};

const eachfacultydetails = async (req, res) => {
  try {
    const facultyid = req.params.id;
    console.log(facultyid);
    const existfaculty = await Faculty.findById(facultyid).select("-password");
    console.log(existfaculty);
    if (!existfaculty) {
      return res.status(400).json({
        success: false,
        message: "Faculty does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        existfaculty,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while fetching the data",
    });
  }
};

const uploadImages = async (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(401).json({
        success: false,
        message: "images is are null",
      });
    }

    let images = req.files?.images;
    console.log("images : ", images);

    if (!Array.isArray(images)) {
      images = [images];
    }

    console.log("id : ", images._id);

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

    const createdData = new Gallery({
      images: uploadedImgUrls,
    });

    console.log("res :", createdData);

    const imgageres = await createdData.save();
    console.log("down : ", imgageres);

    return res.status(201).json({
      success: true,
      message: "images uploaded successfully",
      data: imgageres,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while uploading the image",
    });
  }
};

const addImages = async (req, res) => {
  try {
    if (!req.files || !req.files.images) {
      return res.status(401).json({
        success: false,
        message: "images is are null",
      });
    }

    const id = req.params.id;
    let images = req.files.images;
    console.log(id, images);

    if (!Array.isArray(images)) {
      images = [images];
    }

    let uploadedImgUrls = [];

    for (let image of images) {
      const supportedTypes = ["jpeg", "jpg", "png", "webp"];

      const type = image.name.split(".")[1].toLowerCase();

      if (!checkimgValidity(type, supportedTypes)) {
        return res.status(401).json({
          success: false,
          message: "image type is not correct",
        });
      }

      const image_res = await uploadImgToCloud(image, "/gallery");
      console.log(image_res.secure_url);
      uploadedImgUrls.push(image_res.secure_url);
    }

    const existGallery = await Gallery.findByIdAndUpdate(
      id,
      {
        $push: {
          images: { $each: uploadedImgUrls ? [...uploadedImgUrls] : [] },
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!existGallery) {
      return res.status(401).json({
        success: false,
        message: "no such gallery",
      });
    }

    return res.status(201).json({
      success: true,
      message: "uploaded successfully",
      data: existGallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while uploading the images",
    });
  }
};

const imagesData = async (req, res) => {
  try {
    const data = await Gallery.find({});

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "no data found",
      });
    }

    return res.status(201).json({
      success: true,
      message: "data fetched correctly",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while fetching images",
    });
  }
};

const singleEventData = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Gallery.findById({ _id: id });

    if (!data) {
      return res.json({
        success: false,
        message: "no data found",
      });
    }

    return res.json({ success: true, data: data });
  } catch (error) {
    return res.json({
      success: false,
      message: "error while fetching the data",
    });
  }
};

export {
  createAdmin,
  adminLogin,
  adminLogout,
  admindata,
  changepass,
  createFaculty,
  eachfacultydetails,
  updateAdmin,
  uploadImages,
  addImages,
  imagesData,
  deleteFaculty,
  singleEventData,
};
