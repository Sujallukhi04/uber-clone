import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BlackListToken from "../models/blackList.js";
import Captain from "../models/captain.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const isBlackListed = await BlackListToken.findOne({ token });

  if (isBlackListed) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const authCaptain = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const isBlackListed = await BlackListToken.findOne({ token });

  if (isBlackListed) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await Captain.findById(decoded._id);
    req.captain = captain;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
export { authUser, authCaptain };
