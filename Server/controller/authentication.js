import { AuthenticateRepository } from "../repository/index.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendConfirmEmail } from "../utils/mailTransport.js";
import verifyToken from "../middleware/verifyToken.js";
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
      return res.status(401).json({
        error: "Verify token expired, go to sign in page to send new email",
      });
    }

    return res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const existingUser = await AuthenticateRepository.getUserByEmail(email);
    const passwordMatch = bcrypt.compareSync(password, existingUser.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Bad Credential" });
    }
    if (!existingUser.verify) {
      return res.status(400).json({ error: "The account is not verified!" });
    }
    const accessToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1hr",
      }
    );
    const refreshToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1w",
      }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 30 * 1000),
      sameSite: "lax",
      secure: false,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 60 * 1000),
      sameSite: "lax",
      secure: false,
    });
    return res
      .status(200)
      .json({ message: "Login successfully! Welcome back" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getUserInfo = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res
        .status(401)
        .json({ error: "No cookie for accessToken was provided" });
    }
    const decodedToken = verifyToken(req, res, token);
    const user = await AuthenticateRepository.getUserById(decodedToken.userId);
    const { password, createdAt, updatedAt, ...filterdUser } = user;
    return res.status(200).json(filterdUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res
        .status(401)
        .json({ error: "No cookie for refreshToken was provided" });
    }
    const decodedToken = verifyToken(req, res, token);
    const accessToken = jwt.sign({ userId: decodedToken.userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1min",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 30 * 1000),
      sameSite: "lax",
      secure: false,
    });
    return res.status(200).json({message: "accessToken has been succesfully refreshed!"})
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default {
  authenticate,
  signUp,
  verifyUser,
  login,
  getUserInfo,
  refreshToken
};
