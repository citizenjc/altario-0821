import { getConnection } from "../db/MongoSetup";

export const savePayments = async (payments: any) => {
  const client = getConnection();
  const db = client?.db(process.env.MONGO_INITDB_DATABASE);
  const paymentsDb = db?.collection("payments");

  if (paymentsDb) {
    // this sucks
    await paymentsDb.deleteMany({});
    await paymentsDb.insertMany(payments);
  }
};

export const getPayments = async () => {
  const client = getConnection();
  const db = client?.db(process.env.MONGO_INITDB_DATABASE);
  const payments = db?.collection("payments");

  if (payments) {
    return await payments.find().toArray();
  }

  return [];
};

export const clearPayments = async () => {
  const client = getConnection();
  const db = client?.db(process.env.MONGO_INITDB_DATABASE);
  const payments = db?.collection("payments");

  if (payments) {
    await payments.deleteMany({});
  }
};
