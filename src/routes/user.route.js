import express from "express";
import { userController } from "../controller/UserController.js";

const userRoute = express.Router();

userRoute.get("/", userController.getAll);
userRoute.get("/:id", userController.getOne);
userRoute.post("/", userController.addUser);
userRoute.put("/", userController.updateUser);
userRoute.delete("/", userController.removeUser);

export { userRoute };
