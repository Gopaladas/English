import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const checkToken =  (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token", token);
    if (!token) {
      return res.json({
        isLoggedIn: false,
        message: "No token, authorization denied",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    return res.json({ isLoggedIn: false, message: "Token is not valid" });
  }
};

export default checkToken;
