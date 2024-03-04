import app, { PORT } from "./app";

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.error("Unhandled rejection at: " + promise);
  console.error("Reason: " + reason);
  process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
  console.error(err);
  process.exit(1);
});
