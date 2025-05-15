import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { Prisma } from "../../prisma/generated/client";

export const errorResponse = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
):any => {
  console.error(error);

  // Error from prisma
  if (error instanceof  Prisma.PrismaClientKnownRequestError) {
    return res.status(400).send({
      message: error.message,
      code: error.code,
    });
  }

  // AppError: Custom error class
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({ message: error.message });
  }

  // Unknown error
  return res.status(500).send({
    message: "Internal Server Error",
    error: error instanceof Error ? error.message : "Unknown error",
  });
};