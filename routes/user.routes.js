import express from "express";
const router = express.Router();
import {
  register,
  updateProfile,
  login,
  logout,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, updateProfile);
router.route("/logout").post(logout);
export default router;
