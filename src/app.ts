import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {
  authMiddleware,
  errorMiddleware,
} from "./middlewares/index.middleware";
import routes from "./routes/index.route";
import connect from "./db/connect";

dotenv.config();

connect();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(authMiddleware);
app.use("/v1/api", routes);
app.use(errorMiddleware);

export const PORT = process.env.PORT;

export default app;
