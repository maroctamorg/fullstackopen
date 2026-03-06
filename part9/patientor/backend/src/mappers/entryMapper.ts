import { z } from "zod";
import { NewEntry } from "../types";
import { assertObjectInput, validateRequiredFields } from "./mapperUtils";

const diagnosisCodesSchema = z.array(z.string()).optional();

const newEntrySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("Hospital"),
    description: z.string().min(1),
    date: z.string().min(1),
    specialist: z.string().min(1),
    diagnosisCodes: diagnosisCodesSchema,
    discharge: z.object({
      date: z.string().min(1),
      criteria: z.string().min(1),
    }),
  }),
  z.object({
    type: z.literal("OccupationalHealthcare"),
    description: z.string().min(1),
    date: z.string().min(1),
    specialist: z.string().min(1),
    diagnosisCodes: diagnosisCodesSchema,
    employerName: z.string().min(1),
    sickLeave: z
      .object({
        startDate: z.string().min(1),
        endDate: z.string().min(1),
      })
      .optional(),
  }),
  z.object({
    type: z.literal("HealthCheck"),
    description: z.string().min(1),
    date: z.string().min(1),
    specialist: z.string().min(1),
    diagnosisCodes: diagnosisCodesSchema,
    healthCheckRating: z.number().int().min(0).max(3),
  }),
]);

const requiredNewEntryFields: Record<string, string[]> = {
  Hospital: ["description", "date", "specialist", "discharge"],
  OccupationalHealthcare: ["description", "date", "specialist", "employerName"],
  HealthCheck: ["description", "date", "specialist", "healthCheckRating"],
};

export const mapNewEntry = (input: unknown): NewEntry => {
  assertObjectInput(input);
  validateRequiredFields(input, ["type"]);

  const typeParseResult = z.string().safeParse(input.type);
  if (!typeParseResult.success) {
    return newEntrySchema.parse(input);
  }

  const type = typeParseResult.data;
  const requiredFields = requiredNewEntryFields[type];
  if (!requiredFields) {
    return newEntrySchema.parse(input);
  }

  validateRequiredFields(input, requiredFields);
  return newEntrySchema.parse(input);
};
