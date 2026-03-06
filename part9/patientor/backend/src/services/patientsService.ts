import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";
import type { Entry, NewEntry } from "../types/entry";
import type {
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types/patient";
import { toNonSensitivePatient } from "../mappers/patientMapper";
import { EntityNotFound } from "../errors/EntityNotFound";

const patients: Patient[] = patientsData;

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(toNonSensitivePatient);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patientToAdd = {
    id: uuid(),
    ...newPatient,
    entries: [],
  };

  patients.push(patientToAdd);
  return patientToAdd;
};

const findById = (id: string): Patient => {
  const patient = patients.find((currentPatient) => currentPatient.id === id);
  if (!patient) {
    throw new EntityNotFound("patient not found");
  }

  return patient;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitivePatients,
  addPatient,
  findById,
  addEntry,
};
