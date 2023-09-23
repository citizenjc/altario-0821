import { Router, Request, Response } from "express";
import { generatorRouter } from "./Generator";
import { paymentRouter } from "./Payment";

// setup index router, import other routers here
export const indexRouter = Router();

indexRouter.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

indexRouter.use("/generator", generatorRouter);
indexRouter.use("/payment", paymentRouter);
