import dbConnectionClient, { dbActionQuery } from "../db/connection.js";

class CraftServices {
  getAll = async () => {
    let respData = [];
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");
      const cursor = collection.find();

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
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");

      const options = {
        projection: { _id: id },
      };

      const resData = await collection.findOne({}, options);
    } catch (error) {
      console.log("Get Product ", error);
    } finally {
      return resData;
      await dbConnectionClient.close();
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
      console.log("Add Product ", error);
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
      await dbConnectionClient.close();
      return result;
    }
  };

  updateAll = async () => {
    let result = null;
    try {
      const collection = dbConnectionClient
        .db("art_craft")
        .collection("product");

      result = await collection.updateMany({}, [
        {
          $set: {
            stockStatus: { $toBool: "$stockStatus" },
            customization: { $toBool: "$customization" },
          },
        },
      ]);
    } catch (error) {
      console.log("Update Error, ", error);
    } finally {
      await dbConnectionClient.close();
      return result;
    }
  };

  deleteOne = async () => {};
}

const craftServices = new CraftServices();

export { craftServices };
