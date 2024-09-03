import express from "express";
import { craftController } from "../controller/craft.controller.js";

const craftRoute = express.Router();

craftRoute.get("/", craftController.getAll);
craftRoute.get("/:id", craftController.getOne);
craftRoute.post("/", craftController.addUser);
craftRoute.put("/", craftController.updateUser);
craftRoute.delete("/", craftController.removeUser);

export { craftRoute };
