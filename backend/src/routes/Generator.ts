import { Router, Request, Response } from "express";
import { generateCode, generateGrid } from "../controllers/Generator";

export const generatorRouter = Router();

generatorRouter.post("/", (req: Request, res: Response) => {
  const { modifier, columns, rows } = req.body;

  let result;

  try {
    const grid = generateGrid(modifier, columns, rows);
    const code = generateCode(grid);

    result = {
      grid: grid,
      code: code,
    };
  } catch (e) {
    console.log("Could not generate grid", e);
    res.status(500).json({ message: "Could not generate grid" });
  }

  res.status(200).json(result);
});
