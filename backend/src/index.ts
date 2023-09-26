import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { indexRouter } from "./routes/Index";
import bodyParser from "body-parser";
import { connect } from "./db/MongoSetup";

dotenv.config();

const app: Express = express();
const port: string | undefined = process.env.BACKEND_PORT;

//use cors
app.use(
  cors({
    origin: "*", //allow all origins
  })
);

//use json
app.use(bodyParser.json());

//set up router
app.use("/", indexRouter);

//listen to port, starting server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//connect to mongodb
connect();
