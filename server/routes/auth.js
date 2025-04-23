import express from "express";
import { register, login } from "../controllers/authController.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/authValidator.js";
import validateRequest from "../middlewares/validateRequest.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}`,
    user: req.user,
  });
});
export default router;
