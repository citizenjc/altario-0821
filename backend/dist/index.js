"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Index_1 = require("./routes/Index");
const body_parser_1 = __importDefault(require("body-parser"));
const MongoSetup_1 = require("./db/MongoSetup");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.BACKEND_PORT;
//use cors
app.use((0, cors_1.default)({
    origin: "*", //allow all origins
}));
//use json
app.use(body_parser_1.default.json());
//set up router
app.use("/", Index_1.indexRouter);
//listen to port, starting server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//connect to mongodb
(0, MongoSetup_1.connect)();
