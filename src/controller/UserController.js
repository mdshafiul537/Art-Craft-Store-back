import { userServices } from "../services/user.services.js";
import respFormat from "../utils/respFormat.js";

class UserController {
  getAll = async (req, resp) => {
    try {
      const users = await userServices.getAll();
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
      const user = await userServices.getOne(id);
      if (user) {
        resp.status(200);
        resp.send(respFormat(user, "user found", true));
      } else {
        resp.status(202);
        resp.send(respFormat(user, "user not found by id"));
      }
    } catch (error) {
      // console.log("user find by id Error ", error);
      resp.status(202);
      resp.send(respFormat(null, "user not found  by id"));
    }
  };

  addUser = async (req, resp) => {
    try {
      const user = await userServices.addOne(req.body);
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
      const users = await userServices.userUpdate(req.body);
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
      const users = await userServices.deleteOne(req.body);
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

export const userController = new UserController();
