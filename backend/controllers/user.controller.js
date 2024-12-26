import User from "../models/user.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ erros: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    const hashpassword = await User.hashPassword(password);

    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname?.lastname,
      email,
      password: hashpassword,
    });

    const token = user.generateAuthToken();

    res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ erros: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });

    if (!isUser)
      res.status(401).json({ message: "Inavalid email or password" });

    const isMatched = isUser.comparePassword(password);

    if (!isMatched) res.status(401).json({ message: "Inavalid password" });

    const token = isUser.generateAuthToken();

    res.status(200).json({ token, user: isUser });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { register, login };
