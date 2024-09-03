import { dbActionQuery, dbConnectionClient } from "../db/connection.js";

class CraftServices {
  collection = null;
  isInitialize = false;

  initProductCollection = () => {
    const database = dbConnectionClient.db("art_craft");

    this.collection = database.collection("product");
    this.isInitialize = true;
  };

  getAll = async () => {
    let respData = [];
    try {
      if (!this.isInitialize) {
        this.initProductCollection();
      }

      const cursor = this.collection.find();

      respData = await cursor.toArray();
    } catch (error) {
      console.log("Get All Product ", error);
    } finally {
      await dbConnectionClient.close();
      return respData;
    }
  };

  getOne = async (id) => {
    let resData = null;
    try {
      if (!this.isInitialize) {
        this.initProductCollection();
      }

      const options = {
        projection: { _id: id },
      };

      const resData = await this.collection.findOne({}, options);
    } catch (error) {
      console.log("Get Product ", error);
    } finally {
      return resData;
      await dbConnectionClient.close();
    }
  };

  addOne = async (item) => {
    let addResult = null;
    console.log("Product Service Add Action ...");

    try {
      if (!this.isInitialize) {
        this.initProductCollection();
      }

      addResult = await this.collection.insertOne(item);
    } catch (error) {
      console.log("Add Product ", error);
    } finally {
      return addResult;
    }
  };

  userUpdate = async (item) => {
    let result = null;
    try {
      if (!this.isInitialize) {
        this.initProductCollection();
      }

      const filter = { _id: item.id };

      const options = { upsert: true };

      const { name, email, profileURL } = uUser;
      const updateDoc = {
        $set: { name, email, profileURL, create },
      };
      // Update the first document that matches the filter
      result = await this.collection.updateOne(filter, updateDoc, options);
    } finally {
      // Close the connection after the operation completes
      await dbConnectionClient.close();
      return result;
    }
  };

  deleteOne = async () => {};
}

const craftServices = new CraftServices();

export { craftServices };
