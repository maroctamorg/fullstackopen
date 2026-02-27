import { Request, Response } from "express";
import { calculateBmi } from "../bmiCalculator";

export const getBmi = (req: Request, res: Response) => {
  const { height, weight } = req.query;

  if (typeof height !== "string" || typeof weight !== "string") {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const parsedHeight = Number(height);
  const parsedWeight = Number(weight);

  if (
    Number.isNaN(parsedHeight) ||
    Number.isNaN(parsedWeight) ||
    parsedHeight <= 0 ||
    parsedWeight <= 0
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json({
    weight: parsedWeight,
    height: parsedHeight,
    bmi: calculateBmi(parsedHeight, parsedWeight),
  });
};
