import { Request, Response } from "express";
import { calculateExercises } from "../exerciseCalculator";

export const postExercises = (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const parsedTarget = Number(target);
  const parsedDailyExercises = daily_exercises.map(Number);

  if (Number.isNaN(parsedTarget) || parsedDailyExercises.some(Number.isNaN)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json(calculateExercises(parsedDailyExercises, parsedTarget));
};
