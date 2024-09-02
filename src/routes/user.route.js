import express from "express";
import { userController } from "../controller/UserController.js";

const userRoute = express.Router();

userRoute.get("/", userController.getAll);

export { userRoute };
