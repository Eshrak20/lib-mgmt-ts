import express from "express";
import { createBook, deleteBookById, getBook, getBookById, updateBookById } from "../controllers/lib.controller";

const router = express.Router();

router.post("/books", createBook);
router.get("/books", getBook);
router.get("/book/:id", getBookById);
router.put("/book/:id", updateBookById);
router.delete("/book/:id", deleteBookById);

// router.post("/borrow", borrowBook);


export default router;
