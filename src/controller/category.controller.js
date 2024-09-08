import { categoryServices } from "../services/category.services.js";
import respFormat from "../utils/respFormat.js";

class CategoryController {
  getAll = async (req, resp) => {
    try {
      const categories = await categoryServices.getAll();
      if (categories) {
        resp.status(200);
        resp.send(respFormat(categories, "Categories found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(categories, "Categories not found"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "Categories not found"));
    }
  };

  getOne = async (req, resp) => {
    try {
      // console.log("User Request ", req);

      const { id } = req.params;
      const category = await categoryServices.getOne(id);
      if (category) {
        resp.status(200);
        resp.send(respFormat(category, "Category found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(category, "Category not found by id"));
      }
    } catch (error) {
      // console.log("Category find by id Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "Category not found  by id"));
    }
  };

  add = async (req, resp) => {
    try {
      // console.log("User Body ", req.body);
      const category = await categoryServices.addOne(req.body);
      if (category) {
        resp.status(200);
        resp.send(respFormat(category, "Category added successfully", true));
      } else {
        resp.status(202);
        resp.send(respFormat(category, "Category add failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "Category add failed"));
    }
  };
  update = async (req, resp) => {
    try {
      const category = await categoryServices.userUpdate(req.body);
      if (category) {
        resp.status(200);
        resp.send(respFormat(category, "Category updated :)", true));
      } else {
        resp.status(202);
        resp.send(respFormat(category, "Category update failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "Category update failed"));
    }
  };

  remove = async (req, resp) => {
    try {
      const category = await categoryServices.deleteOne(req.body);
      if (category) {
        resp.status(200);
        resp.send(respFormat(category, "Category Deleted", true));
      } else {
        resp.status(202);
        resp.send(respFormat(category, "Category Deleted failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "Category Deleted failed"));
    }
  };
}

export const categoryController = new CategoryController();
