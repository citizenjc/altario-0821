import { MongoClient } from "mongodb";

const MONGO_URL: string = process.env.MONGODB_URL || "";

let client: MongoClient;

const connect = async () => {
  try {
    client = await MongoClient.connect(MONGO_URL);

    console.log("Connected to mongodb");

    return client;
  } catch (e) {
    console.log("Could not connect to mongodb", e);
  }
};

const getConnection = () => client;

const closeConnection = () => client.close();

export { connect, getConnection, closeConnection };
