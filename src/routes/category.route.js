import express from "express";
import { categoryController } from "../controller/category.controller.js";

const categoryRoute = express.Router();

categoryRoute.get("/", categoryController.getAll);
categoryRoute.get("/:id", categoryController.getOne);
categoryRoute.post("/", categoryController.add);
categoryRoute.put("/", categoryController.update);
categoryRoute.delete("/", categoryController.remove);

export { categoryRoute };
