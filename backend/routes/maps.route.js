import express from "express";
import { authUser, authCaptain } from "../middlewares/auth.middleware.js";
import {
  getCoordinates,
  getDistanceTimes,
  getAutoCompleteSuggestion,
  getcoordinate,
} from "../controllers/maps.controller.js";
import { query } from "express-validator";

const router = express.Router();

router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);

router.get(
  "/get-coordinate",
  query("address").isString().isLength({ min: 3 }),
  authCaptain,
  getcoordinate
);

router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTimes
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 1 }),
  authUser,
  getAutoCompleteSuggestion
);
export default router;
