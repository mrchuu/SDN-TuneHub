import { AuthenticateRepository } from "../repository/index.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendConfirmEmail } from "../utils/mailTransport.js";
const authenticate = async (req, res) => {
  try {
    const result = await AuthenticateRepository.authenticate();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      introduction,
      profilePicture,
    } = req.body;

    if (
      firstName.length == 0 ||
      lastName.length == 0 ||
      email.length == 0 ||
      password.length == 0
    ) {
      return res
        .status(400)
        .json({ error: "Please fill out all the mandatory field" });
    }
    if (confirmPassword !== password) {
      return res
        .status(400)
        .json({ error: "Password does not match confirm password" });
    }

    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = await AuthenticateRepository.addUser({
      firstName,
      lastName,
      email,
      hashedPassword,
      introduction,
      profilePicture,
    });
    await sendConfirmEmail(email, newUser._id);
    return res.status(201).json({
      data: "Sign up successfully, go to your email to confirm signing up. The email will expire in an hour",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const token = req.params.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { userId } = decodedToken;

    const result = await AuthenticateRepository.verifyUser(userId);
    console.log(result);
    return res
      .status(200)
      .json({ data: "The user was successfully verified!! Now redirecting" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(500)
        .json({ error: "Verify token expired, go to sign in page to send new email" });
    }

    return res.status(500).json({ error: error.message });
  }
};
export default {
  authenticate,
  signUp,
  verifyUser,
};
