import { craftServices } from "../services/user.services.js";
import respFormat from "../utils/respFormat.js";

class CraftController {
  getAll = async (req, resp) => {
    try {
      const users = await craftServices.getAll();
      if (users) {
        resp.status(200);
        resp.send(respFormat(users, "users found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(users, "user not found"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "user not found"));
    }
  };

  getOne = async (req, resp) => {
    try {
      // console.log("User Request ", req);

      const { id } = req.params;
      const user = await craftServices.getOne(id);
      if (user) {
        resp.status(200);
        resp.send(respFormat(user, "user found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(user, "user not found by id"));
      }
    } catch (error) {
      console.log("user find by id Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "user not found  by id"));
    }
  };

  addUser = async (req, resp) => {
    try {
      console.log("User Body ", req.body);
      const user = await craftServices.addOne(req.body);
      if (user) {
        resp.status(200);
        resp.send(respFormat(user, "user added successfully", true));
      } else {
        resp.status(202);
        resp.send(respFormat(user, "user add failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "user add failed"));
    }
  };
  updateUser = async (req, resp) => {
    try {
      const users = await craftServices.userUpdate(req.body);
      if (users) {
        resp.status(200);
        resp.send(respFormat(users, "user updated :)", true));
      } else {
        resp.status(202);
        resp.send(respFormat(users, "user update failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "user update failed"));
    }
  };

  removeUser = async (req, resp) => {
    try {
      const users = await craftServices.deleteOne(req.body);
      if (users) {
        resp.status(200);
        resp.send(respFormat(users, "user Deleted", true));
      } else {
        resp.status(202);
        resp.send(respFormat(users, "user Deleted failed"));
      }
    } catch (error) {
      resp.status(202);
      resp.send(respFormat(null, "user Deleted failed"));
    }
  };
}

export const craftController = new CraftController();
