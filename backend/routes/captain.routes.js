import express from "express";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { register } from "../controllers/captain.controller.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 charachter long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Must Be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("vehicle color must be at least 3 charachter long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("vehicle plate must be at least 3 charachter long"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("vehicle capacity must be at least 1 "),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  register
);

export default router;
