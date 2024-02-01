import { AuthenticateRepository } from "../repository/index.js";
const authenticate = async (req, res) => {
  try {
    const result = await AuthenticateRepository.authenticate();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
export default {
    authenticate
}