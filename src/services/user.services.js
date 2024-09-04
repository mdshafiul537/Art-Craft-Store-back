import dbConnectionClient, { dbActionQuery } from "../db/connection.js";

class UserServices {
  getAll = async () => {
    let usersResp = [];
    try {
      const database = dbConnectionClient.db("art_craft");
      const collection = database.collection("user");

      // Execute query
      const cursor = collection.find();
      // Print a message if no documents were found
      usersResp = await cursor.toArray();
    } finally {
      return usersResp;
    }
  };

  getOne = async (id) => {
    console.log("User Finding using id ", id);
    let respUser = null;
    try {
      // Get the database and collection on which to run the operation
      const database = dbConnectionClient.db("art_craft");
      const collection = database.collection("user");

      const options = {
        projection: { _id: id },
      };

      const respUser = await collection.findOne({}, options);
    } catch (error) {
      console.log("User By ID Error, ", error);
    } finally {
      return respUser;
    }
  };

  addOne = async (user) => {
    let userResult = null;
    console.log("User Service Add Action ...");

    try {
      dbActionQuery((db) => {
        const collection = db.collection("user");
        user.create = new Date();
        userResult = collection.insertOne(user);
      });
    } catch (error) {
      console.log("addOne Error, ", error);
    } finally {
      return userResult;
    }
  };

  userUpdate = async (uUser) => {
    try {
      const database = dbConnectionClient.db("art_craft");
      const collection = database.collection("user");

      const filter = { _id: uUser.id };

      const options = { upsert: true };

      const { name, email, profileURL } = uUser;
      const updateDoc = {
        $set: { name, email, profileURL, create },
      };
      // Update the first document that matches the filter
      const result = await collection.updateOne(filter, updateDoc, options);
    } finally {
      // Close the connection after the operation completes
    }
  };

  deleteOne = async () => {};
}

const userServices = new UserServices();

export { userServices };
