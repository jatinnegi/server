export const isDevelopment = process.env.NODE_ENV === "development";

export const allowedOrigin = isDevelopment
  ? "http://localhost:3000"
  : "stackdrive-client.vercel.app";
