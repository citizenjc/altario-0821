// Given the time constraints, I'm saving, fetching and clearing all payments "blindly".
// A real CRUD for this kind of API would be per "payment", with individual adds, deletes
// and updates. I'm also not doing any validation on the data, SORRY! :(

import { Router, Request, Response } from "express";
import { clearPayments, getPayments, savePayments } from "../services/Payment";

export const paymentRouter = Router();

//save payments
paymentRouter.post("/", async (req: Request, res: Response) => {
  const { paymentsList } = req.body;

  try {
    await savePayments(paymentsList);
  } catch (e) {
    console.log("Could not save payments", e);
    res.status(500).json({ message: "Could not save payments" });
  }

  res.status(200).json({ message: "Payments saved" });
});

//get payments
paymentRouter.get("/", async (req: Request, res: Response) => {
  const payments = await getPayments();

  res.status(200).json(payments);
});

//clear payments
paymentRouter.delete("/", async (req: Request, res: Response) => {
  await clearPayments();

  res.status(200).json({ message: "Payments cleared" });
});
