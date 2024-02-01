import User from "../model/User.js";
const authenticate = async () => {
  try {
    return { data: "hahaha" };
  } catch (error) {
    throw new Error(error.toString());
  }
};
export default {
  authenticate,
};
