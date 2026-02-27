import express from "express";
import { getBmi } from "./controllers/bmi";

const app = express();
const PORT = 3000;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", getBmi);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
