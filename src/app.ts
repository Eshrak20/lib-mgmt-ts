import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
const app: Application = express();

const noteSchema = new Schema({
  title: String,
  content: String,
});

const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Nice Note For Mongoose",
    content: "I am Learning bashmara jinish",
  });
  await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note Created Nicely",
    note: myNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World Eshrak!");
});

export default app;
