import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const checkToken = async (req, res, next) => {
  try {
    // Access the token from cookies
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    // Attach the decoded information to the req object
    req.user = decoded;
    console.log(req.user);
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res
      .status(400)
      .json({ success: false, message: "Token verification failed" });
  }
};

export default checkToken;
