import { ObjectId } from "mongodb";
import dbConnectionClient, { dbActionQuery } from "../db/connection.js";
import { esIsEmpty } from "../utils/esHelper.js";

class CraftServices {
  getByQuery = async (query) => {
    let respData = [];
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");

      let filter = {};

      if (query.stock && query.customizable) {
        filter = { $and: [{ stockStatus: true }, { customization: true }] };
      } else if (query.stock) {
        filter = { stockStatus: true };
      } else if (query.customizable) {
        filter = { customization: true };
      } else if (!esIsEmpty(query.rating)) {
        filter = { rating: { $gte: query.rating } };
      }

      const cursor = collection.find(filter).limit(12);

      respData = await cursor.toArray();
    } catch (error) {
      // console.log("Get Query All Product ", error);
    } finally {
      return respData;
    }
  };

  getByCat = async (category) => {
    let respData = [];
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");
      const cursor = collection.find({ category }).limit(6);

      respData = await cursor.toArray();
    } catch (error) {
      // console.log("Get All Product ", error);
    } finally {
      return respData;
    }
  };

  getByUser = async (user) => {
    console.log("Get User Crafts ", user);
    let respData = [];
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");
      const cursor = collection.find({
        $or: [{ userEmail: user }, { userName: user }],
      });

      respData = await cursor.toArray();
    } catch (error) {
      console.log("Get All Product ", error);
    } finally {
      return respData;
    }
  };
  getAll = async () => {
    let respData = [];
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");
      const cursor = collection.find();

      respData = await cursor.toArray();
    } catch (error) {
      // console.log("Get All Product ", error);
    } finally {
      return respData;
    }
  };

  getOne = async (id) => {
    let resData = null;
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");

      const filter = { _id: new ObjectId(id) };

      const options = { upsert: true };

      resData = await collection.findOne(filter);
    } catch (error) {
      // console.log("Get One Product Error, ", error);
    } finally {
      return resData;
    }
  };

  addOne = async (item) => {
    let addResult = null;

    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");

      const { customization, stockStatus, rating, price } = item;
      item.customization = Boolean(customization);
      item.stockStatus = Boolean(stockStatus);
      item.rating = Number(rating);
      item.price = Number(price);

      addResult = await collection.insertOne(item);
    } catch (error) {
      // console.log("Add Product ", error);
    } finally {
      return addResult;
    }
  };

  update = async (item) => {
    let result = null;

    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");

      const filter = { _id: new ObjectId(item.id) };

      const options = { upsert: true };

      const updateDoc = {
        $set: item,
      };

      // Update the first document that matches the filter
      result = await collection.updateOne(filter, updateDoc, options);
    } finally {
      return result;
    }
  };

  updateAll = async () => {
    let result = null;
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");

      result = await collection.updateMany(
        { userEmail: "md.shafiul.islam@gmail.com" },
        [
          {
            $set: {
              userEmail: "shafiul2014bd@gmail.com",
            },
          },
        ]
      );
    } catch (error) {
      // console.log("Update Error, ", error);
    } finally {
      return result;
    }
  };

  deleteOne = async (id) => {
    // console.log("Delete Item Id ", id);
    let resp = null;
    try {
      const database = dbConnectionClient.db("art_craft");
      const artCraft = database.collection("product");

      const query = { _id: new ObjectId(id) };
      resp = await artCraft.deleteOne(query);
    } catch (error) {
      // console.log("Item Delete Error ", error);
    } finally {
      return resp;
    }
  };
}

const craftServices = new CraftServices();

export { craftServices };
