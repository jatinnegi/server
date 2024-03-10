import { isDevelopment } from "@/config";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const cleanErrors = (errors: any[]): Record<string, string> => {
  const cleanedErrors: Record<string, string> = {};

  for (const error of errors) {
    cleanedErrors[error.path] = error.msg;
  }

  return cleanedErrors;
};

export const generateAuthToken = (id: string, res: Response) => {
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: "strict",
    maxAge: 30 * 60 * 1000,
  });
};

export const jwtVerify = (accessToken: string) => {
  const payload = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  ) as JWTUser;
  return payload;
};

/**
 * Cause intentional delay before sending response. Used to test the loading UI for frontend.
 * @param delay Delay time in milliseconds
 */
export const wait = async (delay: number) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
};
