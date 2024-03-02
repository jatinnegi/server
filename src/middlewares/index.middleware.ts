import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  return res.status(500).send("Something went wrong!");
};
