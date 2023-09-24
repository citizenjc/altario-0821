import { Router, Request, Response } from "express";
import { generateCode, generateGrid } from "../controllers/Generator";

export const generatorRouter = Router();

generatorRouter.post("/", (req: Request, res: Response) => {
  const { modifier, columns, rows } = req.body;

  const grid = generateGrid(modifier, columns, rows);
  const code = generateCode(grid);

  const result = {
    grid: grid,
    code: code,
  };
  res.status(200).json(result);
});
