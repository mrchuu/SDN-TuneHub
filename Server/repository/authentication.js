import User from "../model/User.js";
const authenticate = async () => {
  try {
    return { data: "hahaha" };
  } catch (error) {
    throw new Error(error.toString());
  }
};
const addUser = async ({
  firstName,
  lastName,
  email,
  hashedPassword,
  introduction,
  profilePicture,
}) => {
  try {
    const existingUser = await User.findOne({ email: email }).exec();
    // console.log(existingUser);
    if (existingUser) {
      throw new Error("The email has already been registered !!");
    }
    const result = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
      introduction: introduction,
      profilePicture: profilePicture,
    });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const verifyUser = async (userId) => {
  try {
    const unverifiedUser = await User.findById(userId).exec();
    if (!unverifiedUser) {
      throw new Error("Not found!!");
    }
    if (unverifiedUser.verify) {
      throw new Error("The user has already been verified!!");
    }
    const result = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { verify: true } },
      { new: true }
    );
    if (!result) {
      throw new Error("Something went wrong:(");
    }
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserById = async (userId) => {
  try {
    console.log(userId);
    const existingUser = await User.findById(userId).exec();
    console.log(existingUser);
    if (!existingUser) {
      throw new Error("Not found!!");
    }
    return existingUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default {
  authenticate,
  addUser,
  verifyUser,
  getUserById
};
