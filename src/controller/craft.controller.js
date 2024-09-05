import { craftServices } from "../services/craft.services.js";
import respFormat from "../utils/respFormat.js";

class CraftController {
  getAllByCategory = async (req, resp) => {
    try {
      const { category } = req.params;
      const products = await craftServices.getByCat(category);
      if (products) {
        resp.status(200);
        resp.send(
          respFormat(
            products,
            `${products.length} Products found By '${category}'`,
            true
          )
        );
      } else {
        resp.status(202);
        resp.send(respFormat(products, "Products not found By '${category}'"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "Products not found By '${category}'"));
    }
  };

  getAllByUser = async (req, resp) => {
    try {
      const { user } = req.params;
      const products = await craftServices.getByUser(user);
      if (products) {
        resp.status(200);
        resp.send(
          respFormat(products, `${products.length} Products found`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(products, "Products not found"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "Products not found"));
    }
  };
  getAllByQuery = async (req, resp) => {
    try {
      console.log("Request Query ", req.query);

      const products = await craftServices.getByQuery(req.query);
      if (products) {
        resp.status(200);
        resp.send(
          respFormat(products, `${products.length} Products found`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(products, "Products not found"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "Products not found"));
    }
  };
  getAll = async (req, resp) => {
    try {
      const products = await craftServices.getAll();
      if (products) {
        resp.status(200);
        resp.send(
          respFormat(products, `${products.length} Products found`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(products, "products not found"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "products not found"));
    }
  };

  getOne = async (req, resp) => {
    try {
      const { id } = req.params;
      const product = await craftServices.getOne(id);
      if (product) {
        const catProducts = await craftServices.getByCat(product.category);
        console.log("Related Cat Items ", catProducts);
        resp.status(200);
        resp.send(
          respFormat(
            { product, cat: catProducts },
            "Art & Craft found by ID",
            true
          )
        );
      } else {
        resp.status(202);
        resp.send(respFormat(product, "Art & Craft not found by id"));
      }
    } catch (error) {
      console.log("Art & Craft find by id Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "Art & Craft not found  by id"));
    }
  };

  add = async (req, resp) => {
    try {
      console.log("Item Body ", req.body);
      const product = await craftServices.addOne(req.body);
      if (product) {
        resp.status(200);
        resp.send(respFormat(product, "Item added successfully", true));
      } else {
        resp.status(202);
        resp.send(respFormat(product, "Item add failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "Item add failed"));
    }
  };
  update = async (req, resp) => {
    try {
      const product = await craftServices.update(req.body);
      if (product) {
        resp.status(200);
        resp.send(respFormat(product, "user updated :)", true));
      } else {
        resp.status(202);
        resp.send(respFormat(product, "user update failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "user update failed"));
    }
  };

  updateAll = async (req, resp) => {
    try {
      const updates = await craftServices.updateAll();
      if (updates) {
        resp.status(200);
        resp.send(respFormat(updates, "All updated :)", true));
      } else {
        resp.status(202);
        resp.send(respFormat(product, "All update failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "All update failed"));
    }
  };

  remove = async (req, resp) => {
    try {
      const product = await craftServices.deleteOne(req.body);
      if (product) {
        resp.status(200);
        resp.send(respFormat(product, "product Deleted", true));
      } else {
        resp.status(202);
        resp.send(respFormat(product, "product Deleted failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "product Deleted failed"));
    }
  };
}

export const craftController = new CraftController();
