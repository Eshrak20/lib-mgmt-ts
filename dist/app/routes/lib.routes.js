"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lib_controller_1 = require("../controllers/lib.controller");
const router = express_1.default.Router();
router.post("/books", lib_controller_1.createBook);
router.get("/books", lib_controller_1.getBook);
router.get("/book/:id", lib_controller_1.getBookById);
router.put("/book/:id", lib_controller_1.updateBookById);
router.delete("/book/:id", lib_controller_1.deleteBookById);
router.post("/borrow", lib_controller_1.borrowBook);
router.get("/borrow", lib_controller_1.getBorrowedBooks);
exports.default = router;
