import express from "express";
import { body, query } from "express-validator";
import { authUser, authCaptain } from "../middlewares/auth.middleware.js";
import {
  createride,
  getfares,
  confirmRide,
  startRide,
  endRide,
} from "../controllers/ride.controller.js";
const router = express.Router();

router.post(
  "/create",

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),
  authUser,
  createride
);

router.get(
  "/fares",
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  authUser,
  getfares
);

router.post(
  "/confirm",
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  authCaptain,
  confirmRide
);

router.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRide
);

router.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRide
);

export default router;
