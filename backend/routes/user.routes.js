import express from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/user.controller.js";
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
  ],
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password Must Be at least 6 characters long"),
  ],
  login
);

export default router;
