import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectToDb } from "./db/db.js";
import userRouter from "./routes/user.routes.js";
const app = express();
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

export { app };
