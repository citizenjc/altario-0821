import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { indexRouter } from "./routes/Index";

dotenv.config();

const app: Express = express();
const port = process.env.BACKEND_PORT;

//set up  router
app.use("/", indexRouter);

//listen to port
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
