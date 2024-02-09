import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthenticateRepository } from "../repository/index.js";
const verifyToken = (req, res, token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decodedToken;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Verify token expired, go to sign in page to send new email",
      });
    }
    return res.status(500).json({ error: error.message });
  }
};
export default verifyToken;
