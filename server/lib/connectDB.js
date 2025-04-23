import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// MongoDB connection
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Stop the app if the database connection fails
  }
};
