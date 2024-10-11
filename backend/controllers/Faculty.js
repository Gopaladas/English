import Faculty from "../models/faculty.js";
// import FacultyMain from "../models/facultymain.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import cloudinary from "cloudinary";
cloudinary.v2;

const facultyLogin = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({
      message: "Please enter both name and password",
    });
  }

  try {
    const existfaculty = await Faculty.findOne({ name });

    if (!existfaculty) {
      return res.status(401).json({
        success: false,
        message: "Faculty not found",
      });
    }
    // console.log(existfaculty);

    const isValid = await bcrypt.compare(password, existfaculty.password);

    if (isValid) {
      console.log(isValid);
      const token = createToken(res, existfaculty._id);
      console.log(token);
      return res.status(201).json({
        success: true,
        message: {
          id: existfaculty._id,
          name: name,
          isFaculty: true,
          email: existfaculty.email,
          token: token,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "error while logging faculty",
    });
  }
};

const facultyLogout = async (req, res) => {
  try {
    // Clear the "token" cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    // Send a success response
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ success: false, message: "Logout not successful" });
  }
};

const facultydetails = async (req, res) => {
  try {
    const response = await Faculty.find({});
    // console.log(response);
    if (!response) {
      res.status(400).json({
        success: false,
        message: "no faculty information is added",
      });
    }

    res.status(201).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "error while fecthing details ",
    });
  }
};

function checkimgValidity(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadImgToCloud(facultyimg, path) {
  const options = { path };
  facultyimg.resource_type = "auto";
  return await cloudinary.uploader.upload(facultyimg.tempFilePath, options);
}

async function uploadPdfToCloud(facultyPdf, path) {
  const options = { path };
  facultyPdf.resource_type = "raw";
  facultyPdf.sign_url = true;
  return await cloudinary.uploader.upload(facultyPdf.tempFilePath, options);
}
const updateFaculty = async (req, res) => {
  console.log(req.body);

  try {
    const { name, designation, bio, email, phone, qualification } = req.body;

    const awards = JSON.parse(req.body.awards);
    const achievements = JSON.parse(req.body.achievements);
    const contributions = JSON.parse(req.body.contributions);
    const specialization = JSON.parse(req.body.specialization);

    let id = req.user.id;

    const facultyimg = req.files?.imageUrl;
    console.log(facultyimg);

    const facultyresume = req.files?.resumeUrl;
    console.log(facultyresume);

    const supportedTypes = ["jpeg", "jpg", "png", "webp"];
    const resumesupportTypes = ["pdf"];

    const type = facultyimg.name.split(".")[1].toLowerCase();
    const resumeType = facultyresume.name.split(".")[1].toLowerCase();

    const isSupported = checkimgValidity(type, supportedTypes);
    const isResumeSupported = checkimgValidity(resumeType, resumesupportTypes);
    console.log(isSupported, isResumeSupported);
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

    const image_res = await uploadImgToCloud(facultyimg, "/faculty");
    const resume_res = await uploadPdfToCloud(facultyresume, "/faculty");

    console.log("img : ", image_res?.secure_url);
    console.log("resume : ", resume_res?.secure_url);
    const faculty = await Faculty.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name,
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
    console.log("faculty : ", faculty);
    if (!faculty) {
      return res.json({ message: "Faculty not updated" });
    }

    return res.json({
      success: true,
      message: "faculty details updated successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "error while updating the faculty",
    });
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
      user: {
        id: existfaculty?._id,
        name: existfaculty?.name,
        email: existfaculty?.email,
        designation: existfaculty?.designation,
        imageUrl: existfaculty?.imageUrl,
        resumeUrl: existfaculty?.resumeUrl,
        bio: existfaculty?.bio,
        phone: existfaculty?.phone,
        qualification: existfaculty?.qualification,
        awards: existfaculty?.awards,
        achievements: existfaculty?.achievements,
        contributions: existfaculty?.contributions,
        specialization: existfaculty?.specialization,
        role: "user",
        isFaculty: true,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error while fetching the data",
    });
  }
};

export {
  facultyLogin,
  facultyLogout,
  facultydetails,
  updateFaculty,
  eachfacultydetails,
};
