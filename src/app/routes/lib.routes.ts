import express from "express";
import { borrowBook, createBook, deleteBookById, getBook, getBookById, getBorrowedBooks, updateBookById } from "../controllers/lib.controller";

const router = express.Router();

router.post("/books", createBook);
router.get("/books", getBook);
router.get("/book/:id", getBookById);
router.put("/book/:id", updateBookById);
router.delete("/book/:id", deleteBookById);

router.post("/borrow", borrowBook);
router.get("/borrow", getBorrowedBooks);


export default router;
