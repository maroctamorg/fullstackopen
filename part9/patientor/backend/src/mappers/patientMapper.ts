import { z } from "zod";
import { Gender, Patient, NewPatient } from "../types";
import { InvalidInputError } from "../errors/InvalidInputError";

const requiredNewPatientFields: string[] = [
  "name",
  "dateOfBirth",
  "ssn",
  "gender",
  "occupation",
];

const newPatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().min(1),
  ssn: z.string().min(1),
  gender: z.enum(Gender),
  occupation: z.string().min(1),
});

export const mapNewPatient = (input: unknown): NewPatient => {
  if (!input || typeof input !== "object") {
    throw new InvalidInputError("invalid patient data input");
  }

  const missingField = requiredNewPatientFields.find(
    (field) => !(field in input),
  );
  if (missingField) {
    throw new InvalidInputError(
      `missing required patient data field: ${missingField}`,
    );
  }

  return newPatientSchema.parse(input);
};

export const toNonSensitivePatient = (patient: Patient) => {
  const { id, name, dateOfBirth, gender, occupation } = patient;
  return {
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  };
};
