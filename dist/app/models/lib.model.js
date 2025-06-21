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
exports.LibModel = exports.LibBorrowModel = void 0;
const mongoose_1 = require("mongoose");
const libSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
        required: true,
        trim: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const libBorrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "LibModel"
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    dueDate: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
libSchema.statics.updateAvailability = function (id, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(id);
        if (book) {
            if (book.copies < quantity) {
                throw new Error("Not enough copies available");
            }
            book.copies = book.copies - quantity;
            if (book.copies > 0) {
                book.available = true;
            }
            else {
                book.available = false;
            }
            yield book.save();
        }
        else {
            throw new Error("Book not found");
        }
    });
};
exports.LibBorrowModel = (0, mongoose_1.model)("LibBorrowModel", libBorrowSchema);
exports.LibModel = (0, mongoose_1.model)("LibModel", libSchema);
