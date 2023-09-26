"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.getConnection = exports.connect = void 0;
const mongodb_1 = require("mongodb");
const MONGO_URL = process.env.MONGODB_URL || "";
let client;
const connect = async () => {
    try {
        client = await mongodb_1.MongoClient.connect(MONGO_URL);
        console.log("Connected to mongodb");
        return client;
    }
    catch (e) {
        console.log("Could not connect to mongodb", e);
    }
};
exports.connect = connect;
const getConnection = () => client;
exports.getConnection = getConnection;
const closeConnection = () => client.close();
exports.closeConnection = closeConnection;
