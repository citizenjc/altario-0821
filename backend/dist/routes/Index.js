"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const express_1 = require("express");
const Generator_1 = require("./Generator");
const Payment_1 = require("./Payment");
// setup index router, import other routers here
exports.indexRouter = (0, express_1.Router)();
exports.indexRouter.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
exports.indexRouter.use("/generator", Generator_1.generatorRouter);
exports.indexRouter.use("/payment", Payment_1.paymentRouter);
