import dotenv from "dotenv";
dotenv.config();

export const isDevelopment = process.env.NODE_ENV === "development";

export const allowedOrigin = isDevelopment
  ? "http://localhost:3000"
  : "https://stackdrive-client.vercel.app";
