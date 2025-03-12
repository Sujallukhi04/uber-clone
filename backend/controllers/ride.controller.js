import { validationResult } from "express-validator";
import {
  createRide,
  getfare,
  confirmride,
  startride,
  endride,
} from "../services/ride.service.js";
import Ride from "../models/ride.js";
import {
  getCaptainsInRadius,
  getAddressCoordinate,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
const createride = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ erros: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;
    console.log(req.user);
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(200).json(ride);

    const getPickupCoordinates = await getAddressCoordinate(pickup);

    const captainInRadius = await getCaptainsInRadius(
      getPickupCoordinates.ltd,
      getPickupCoordinates.lng,
      2
    );

    ride.otp = "";

    const rideWithUser = await Ride.findById(ride._id).populate("user");

    captainInRadius.map(async (captain) => {
      console.log(captain);
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getfares = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ erros: errors.array() });
  }
  try {
    const { pickup, destination } = req.query;
    const fare = await getfare(pickup, destination);
    res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;
  try {
    const ride = await confirmride(rideId, req.captain);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;
  console.log(rideId, otp);
  try {
    const ride = await startride({ rideId, otp, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await endride({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export { createride, getfares, confirmRide, startRide, endRide };
