"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatorRouter = void 0;
const express_1 = require("express");
const Generator_1 = require("../controllers/Generator");
exports.generatorRouter = (0, express_1.Router)();
exports.generatorRouter.post("/", (req, res) => {
    const { modifier, columns, rows } = req.body;
    let result;
    try {
        const grid = (0, Generator_1.generateGrid)(modifier, columns, rows);
        const code = (0, Generator_1.generateCode)(grid);
        result = {
            grid: grid,
            code: code,
        };
    }
    catch (e) {
        console.log("Could not generate grid", e);
        res.status(500).json({ message: "Could not generate grid" });
    }
    res.status(200).json(result);
});
