import express from "express";
import { getBmi } from "./controllers/bmi";
import { postExercises } from "./controllers/exercises";

const app = express();
const PORT = 3003;

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", getBmi);
app.post("/exercises", postExercises);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
