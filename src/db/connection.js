import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rdwf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const dbConnectionClient = new MongoClient(uri);

const dbActionQuery = async (actionQuery) => {
  try {
    const database = dbConnectionClient.db("art_craft");
    actionQuery(database);
  } catch (error) {
    console.log("DB Action Query Error ", error);
  } finally {
    await dbConnectionClient.close();
  }
};

export { dbConnectionClient, dbActionQuery };
