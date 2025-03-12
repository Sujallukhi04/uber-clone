import {
  getAddressCoordinate,
  getDistanceTime,
  getAutoCompleteSuggestions,
} from "../services/maps.service.js";
import { validationResult } from "express-validator";

const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

const getDistanceTimes = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    const distanceTime = await getDistanceTime(origin, destination);

    res.status(200).json(distanceTime);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAutoCompleteSuggestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { input } = req.query;

    const suggestions = await getAutoCompleteSuggestions(input);

    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getcoordinate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

export {
  getCoordinates,
  getDistanceTimes,
  getAutoCompleteSuggestion,
  getcoordinate,
};
