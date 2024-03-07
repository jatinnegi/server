import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {
  authMiddleware,
  notFoundMiddleware,
  errorHandlerMiddleware,
} from "./middlewares/index.middleware";
import routes from "./routes/index.route";
import connect from "./db/connect";
import { allowedOrigin } from "@/config";

dotenv.config();

connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(authMiddleware);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "StackDrive Restful API 🚀" });
});
app.use("/api", routes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export const PORT = process.env.PORT;

export default app;
