import express from "express";
import patientsService from "../services/patientsService";
import { mapNewPatient } from "../mappers/patientMapper";
import { mapNewEntry } from "../mappers/entryMapper";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);
  return res.json(patient);
});

router.post("/:id/entries", (req, res) => {
  const newEntry = mapNewEntry(req.body);
  const patient = patientsService.findById(req.params.id);
  const addedEntry = patientsService.addEntry(patient, newEntry);

  return res.status(201).json(addedEntry);
});

router.post("/", (req, res) => {
  const newPatient = mapNewPatient(req.body);
  return res.status(201).json(patientsService.addPatient(newPatient));
});

export default router;
