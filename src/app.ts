import express, { Application } from "express";
import router from "./app/routes/lib.routes";

const app: Application = express();

app.use(express.json());
app.use("/api", router);
export default app;
