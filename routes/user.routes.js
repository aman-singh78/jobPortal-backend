import express from "express";
const router = express.Router();
import {
  register,
  updateProfile,
  login,
  logout,
} from "../controllers/user.controller.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").post(updateProfile);
router.route("/logout").post(logout);
