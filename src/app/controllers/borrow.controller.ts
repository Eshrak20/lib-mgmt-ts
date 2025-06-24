import { Request, Response } from "express";
import { LibBorrow } from "../interfaces/borrow.interface";
import { LibModel } from "../models/book.model";
import { LibBorrowModel } from "../models/borrow.model";
import { handleErrorResponse } from "../utils/errorHandler";
import { sendResponse } from "../utils/sendResponse";

export const borrowBook = async  (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body as unknown as LibBorrow;

    await LibModel.updateAvailability(book, quantity);

    const borrowRecord = new LibBorrowModel({
      book,
      quantity,
      dueDate,
    });

    const savedBorrow = await borrowRecord.save();

    sendResponse({
      res,
      statusCode: 201,
      message: "Book borrowed successfully",
      data: savedBorrow,
    });
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
};

export const getBorrowedBooks = async (req: Request, res: Response) => {
  try {
    // const borrowedBooks = await LibBorrowModel.find();

    const borrowedBooks = await LibBorrowModel.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "libmodels",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: false,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: true,
        },
      },
    ]);
    if (!borrowedBooks) {
      throw new Error("Book not found");
    }
    sendResponse({
      res,
      statusCode: 200,
      message: "Borrowed books summary retrieved successfully",
      data: borrowedBooks,
    });
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
};
