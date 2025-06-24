import express, { Application } from "express";
import path from "path";
import { createBook, deleteBookById, getBook, getBookById, updateBookById } from "./app/controllers/book.controller";
import { borrowBook, getBorrowedBooks } from "./app/controllers/borrow.controller";

const app: Application = express();
const router = express.Router();

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/welcome.html"));
});

router.post("/books", createBook);
router.get("/books", getBook);
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBookById);
router.delete("/books/:id", deleteBookById);

router.post("/borrow", borrowBook);
router.get("/borrow", getBorrowedBooks);

export default app;
