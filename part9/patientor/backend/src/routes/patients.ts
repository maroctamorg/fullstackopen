import express from "express";
import { ZodError } from "zod";
import patientsService from "../services/patientsService";
import { mapNewPatient } from "../mappers/patientMapper";
import { InvalidInputError } from "../errors/InvalidInputError";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = mapNewPatient(req.body);
    return res.status(201).json(patientsService.addPatient(newPatient));
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).send({ error: error.issues });
    }

    if (error instanceof InvalidInputError) {
      return res.status(400).send({ error: error.message });
    }

    return res.status(500).send({ error: "unknown error" });
  }
});

export default router;
