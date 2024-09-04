import express from "express";
import { craftController } from "../controller/craft.controller.js";


const craftRoute = express.Router();

craftRoute.get("/", craftController.getAll);
craftRoute.get("/:id", craftController.getOne);
craftRoute.post("/", craftController.add);
craftRoute.put("/", craftController.update);
craftRoute.delete("/", craftController.remove);
craftRoute.put("/all", craftController.updateAll);

export { craftRoute };
