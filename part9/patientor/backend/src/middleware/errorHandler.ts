import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { InvalidInputError } from "../errors/InvalidInputError";
import { EntityNotFound } from "../errors/EntityNotFound";

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof ZodError) {
    return res.status(400).send({ error: error.issues });
  }

  if (error instanceof InvalidInputError) {
    return res.status(400).send({ error: error.message });
  }

  if (error instanceof EntityNotFound) {
    return res.status(404).send({ error: error.message });
  }

  return res.status(500).send({ error: "unknown error" });
};
