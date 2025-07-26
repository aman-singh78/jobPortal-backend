import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./utils/db.js";
import { register } from "./controllers/user.controller.js";
const PORT = process.env.PORT || 3000;
dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http//localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.listen(PORT, () => {
  connectdb();
  console.log(`Server running at port ${PORT}`);
});
