"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearPayments = exports.getPayments = exports.savePayments = void 0;
const MongoSetup_1 = require("../db/MongoSetup");
const savePayments = async (payments) => {
    const client = (0, MongoSetup_1.getConnection)();
    const db = client?.db(process.env.MONGO_INITDB_DATABASE);
    const paymentsDb = db?.collection("payments");
    if (paymentsDb) {
        // this sucks
        await paymentsDb.deleteMany({});
        await paymentsDb.insertMany(payments);
    }
};
exports.savePayments = savePayments;
const getPayments = async () => {
    const client = (0, MongoSetup_1.getConnection)();
    const db = client?.db(process.env.MONGO_INITDB_DATABASE);
    const payments = db?.collection("payments");
    if (payments) {
        return await payments.find().toArray();
    }
    return [];
};
exports.getPayments = getPayments;
const clearPayments = async () => {
    const client = (0, MongoSetup_1.getConnection)();
    const db = client?.db(process.env.MONGO_INITDB_DATABASE);
    const payments = db?.collection("payments");
    if (payments) {
        await payments.deleteMany({});
    }
};
exports.clearPayments = clearPayments;
