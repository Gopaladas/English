import jwt from "jsonwebtoken";
// import cookie from "cookie";  // You don't need to import `cookie` since `res.cookie` handles cookies in Express

const createToken = (res, id) => {
  try {
    const token = jwt.sign(
      { id }, // Use the actual isAdmin value
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    console.log("Token Creation Issue:");
    console.error(error);
    throw new Error("Token creation failed");
  }
};

export default createToken;
