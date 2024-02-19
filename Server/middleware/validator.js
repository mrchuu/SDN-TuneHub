import AuthenticateRepository from "../repository/authentication.js";

const login = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      introduction,
    } = req.body;
    console.log(req.body);
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
    const existingUser = await AuthenticateRepository.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email is taken" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong!!" });
  }
};
export { login };
