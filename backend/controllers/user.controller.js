import User from "../models/user.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ erros: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashpassword = await User.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname?.lastname,
    email,
    password: hashpassword,
  });

  const token = user.generateAuthToken();

  res.status(200).json({ token, user });
};

export { register };
