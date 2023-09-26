"use strict";
// Given the time constraints, I'm saving, fetching and clearing all payments "blindly".
// A real CRUD for this kind of API would be per "payment", with individual adds, deletes
// and updates. I'm also not doing any validation on the data, SORRY! :(
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const Payment_1 = require("../services/Payment");
exports.paymentRouter = (0, express_1.Router)();
//save payments
exports.paymentRouter.post("/", async (req, res) => {
    const { paymentsList } = req.body;
    try {
        await (0, Payment_1.savePayments)(paymentsList);
    }
    catch (e) {
        console.log("Could not save payments", e);
        res.status(500).json({ message: "Could not save payments" });
    }
    res.status(200).json({ message: "Payments saved" });
});
//get payments
exports.paymentRouter.get("/", async (req, res) => {
    const payments = await (0, Payment_1.getPayments)();
    res.status(200).json(payments);
});
//clear payments
exports.paymentRouter.delete("/", async (req, res) => {
    await (0, Payment_1.clearPayments)();
    res.status(200).json({ message: "Payments cleared" });
});
