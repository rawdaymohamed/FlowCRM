import { body } from "express-validator";
import User from "../models/User.js";

export const registerValidator = [
  body("name")
    .notEmpty().withMessage("Name is required"),

  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 20 }).withMessage("Username must be 3-20 characters")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores")
    .custom(async (username) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("Username is already taken");
      }
      return true;
    }),

  body("email")
    .isEmail().withMessage("Valid email is required")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email is already registered");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("confirmPassword")
    .notEmpty().withMessage("Confirm password is required")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export const loginValidator = [
  body("email")
    .isEmail().withMessage("Valid email is required")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),
];
