import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectToDb } from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import captainRouter from "./routes/captain.routes.js";
import mapsRoter from "./routes/maps.route.js";
import rideRoter from "./routes/ride.route.js";
import cookieParser from "cookie-parser";
const app = express();
connectToDb();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/captain", captainRouter);
app.use("/api/maps", mapsRoter);
app.use("/api/ride", rideRoter);

export { app };
