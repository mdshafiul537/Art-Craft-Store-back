import express from "express";
import { craftController } from "../controller/craft.controller.js";

const craftRoute = express.Router();

craftRoute.get("/", craftController.getAll);
craftRoute.get("/query", craftController.getAllByQuery);
craftRoute.get("/categories/:category", craftController.getAllByCategory);
craftRoute.get("/users/:user", craftController.getAllByUser);

craftRoute.post("/", craftController.add);
craftRoute.put("/", craftController.update);
craftRoute.delete("/", craftController.remove);
craftRoute.put("/all", craftController.updateAll);
craftRoute.get("/:id", craftController.getOne);

export { craftRoute };
