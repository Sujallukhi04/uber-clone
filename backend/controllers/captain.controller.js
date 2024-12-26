import { validationResult } from "express-validator";
import Captain from "../models/captain.js";
import { createCaptain } from "../services/captain.service.js";
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ erros: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  try {
    const emailExist = await Captain.findOne({ email });

    if (emailExist)
      res.status(401).json({
        message: "User alreadt exists",
      });
    const hashedpassword = await Captain.hashPassword(password);

    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedpassword,
      vehicleType: vehicle.vehicleType,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export { register };
