import express from "express";
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.js";
import { connectDB } from "./lib/connectDB.js";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;
connectDB();
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
