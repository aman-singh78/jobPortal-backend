import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;
    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist with this email", sucess: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });
    await newUser.save();
    return res
      .status(201)
      .json({
        message: "User Registered Successfully",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          role: newUser.role,
        },
      });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
