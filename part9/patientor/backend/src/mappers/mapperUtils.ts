import { InvalidInputError } from "../errors/InvalidInputError";

export function assertObjectInput(
  input: unknown,
): asserts input is Record<string, unknown> {
  if (!input || typeof input !== "object") {
    throw new InvalidInputError("invalid input data");
  }
}

export function validateRequiredFields(
  input: Record<string, unknown>,
  requiredFields: string[],
): void {
  const missingField = requiredFields.find((field) => !(field in input));
  if (missingField) {
    throw new InvalidInputError(`missing required field: ${missingField}`);
  }
}
