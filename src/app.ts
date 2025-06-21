import express, { Application } from "express";
import router from "./app/routes/lib.routes";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/welcome.html"));
});
export default app;
