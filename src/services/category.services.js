import dbConnectionClient, { dbActionQuery } from "../db/connection.js";

class CategoryServices {
  getAll = async () => {
    let respData = [];
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("category");

      const cursor = collection.find();

      respData = await cursor.toArray();
    } catch (error) {
      console.log("Get All Category ", error);
    } finally {
      // await dbConnectionClient.close();
      return respData;
    }
  };

  getOne = async (id) => {
    let resData = null;
    console.log("Category ID ", id);
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("category");
      const options = {
        projection: { _id: id },
      };

      const resData = await collection.findOne({}, options);
    } catch (error) {
      console.log("Get Product ", error);
    } finally {
      return resData;
      // await dbConnectionClient.close();
    }
  };

  addOne = async (item) => {
    let addResult = null;
    console.log("Category Service Add Action ...");

    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("category");

      addResult = await collection.insertOne(item);
    } catch (error) {
      console.log("Add Category ", error);
    } finally {
      return addResult;
    }
  };

  update = async (item) => {
    let result = null;
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("category");

      const filter = { _id: item.id };

      const options = { upsert: true };

      const { name, email, profileURL } = uUser;
      const updateDoc = {
        $set: { name, email, profileURL, create },
      };
      // Update the first document that matches the filter
      result = await collection.updateOne(filter, updateDoc, options);
    } finally {
      // Close the connection after the operation completes
      // await dbConnectionClient.close();
      return result;
    }
  };

  deleteOne = async () => {};
}

const categoryServices = new CategoryServices();

export { categoryServices };
