import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { toNonSensitivePatient } from "../mappers/patientMapper";

const patients: Patient[] = patientsData as Patient[];

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(toNonSensitivePatient);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patientToAdd = {
    id: uuid(),
    ...newPatient,
  };

  patients.push(patientToAdd);
  return patientToAdd;
};

export default {
  getNonSensitivePatients,
  addPatient,
};
