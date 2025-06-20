import express from "express";
import { createBook } from "../controllers/lib.controller";

const router = express.Router();

router.post("/books", createBook);

export default router;
