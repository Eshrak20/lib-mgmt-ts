"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedBooks = exports.borrowBook = exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getBook = exports.createBook = void 0;
const lib_model_1 = require("../models/lib.model");
const errorHandler_1 = require("../utils/errorHandler");
const sendResponse_1 = require("../utils/sendResponse");
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new lib_model_1.LibModel(req.body); // receives data from client
        const savedBook = yield book.save(); // saves to MongoDB
        (0, sendResponse_1.sendResponse)({
            res,
            statusCode: 201,
            message: "Book created successfully",
            data: savedBook,
        });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
});
exports.createBook = createBook;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const bookGenre = req.query.filter;
        const query = bookGenre ? { genre: bookGenre } : {};
        const books = yield lib_model_1.LibModel.find(query)
            .limit(limit)
            .sort({
            [sortBy]: sortOrder,
        });
        (0, sendResponse_1.sendResponse)({
            res,
            statusCode: 201,
            message: "Book get successfully",
            data: books,
        });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
});
exports.getBook = getBook;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getById = req.params.id;
        const book = yield lib_model_1.LibModel.findById(getById);
        (0, sendResponse_1.sendResponse)({
            res,
            statusCode: 200,
            message: "Book get successfully",
            data: book,
        });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
});
exports.getBookById = getBookById;
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getById = req.params.id;
        const updateData = req.body;
        const book = yield lib_model_1.LibModel.findByIdAndUpdate(getById, updateData, {
            new: true,
        });
        (0, sendResponse_1.sendResponse)({
            res,
            statusCode: 200,
            message: "Book get successfully",
            data: book,
        });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
});
exports.updateBookById = updateBookById;
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getById = req.params.id;
        yield lib_model_1.LibModel.findByIdAndDelete(getById);
        (0, sendResponse_1.sendResponse)({
            res,
            statusCode: 200,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
});
exports.deleteBookById = deleteBookById;
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        // Check and update copies & availability
        yield lib_model_1.LibModel.updateAvailability(book, quantity);
        // Save borrow record
        const borrowRecord = new lib_model_1.LibBorrowModel({
            book,
            quantity,
            dueDate,
        });
        const savedBorrow = yield borrowRecord.save();
        (0, sendResponse_1.sendResponse)({
            res,
            statusCode: 201,
            message: "Book borrowed successfully",
            data: savedBorrow,
        });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
});
exports.borrowBook = borrowBook;
const getBorrowedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBooks = yield lib_model_1.LibBorrowModel.find();
        (0, sendResponse_1.sendResponse)({
            res,
            statusCode: 200,
            message: "Borrowed books retrieved successfully",
            data: borrowedBooks,
        });
    }
    catch (error) {
        (0, errorHandler_1.handleErrorResponse)(res, error);
    }
});
exports.getBorrowedBooks = getBorrowedBooks;
