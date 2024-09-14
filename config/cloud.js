import cloudinary from "cloudinary";
cloudinary.v2;

const cloudConnect = async (req, res) => {
  try {
    await cloudinary.config({
      cloud_name: process.env.Cloud_Name,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECERET,
    });
    console.log("Cloud connected successfully");
  } catch (error) {
    console.log("cloud issue:");
    console.error(error);
    process.exit(1);
  }
};

export default cloudConnect;
