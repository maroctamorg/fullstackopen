import { Gender } from "./enums/gender";

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatient = Omit<Patient, "id">;
export type NonSensitivePatient = Omit<Patient, "ssn">;
