import { Request, Response } from "express";
import { LibBorrowModel, LibModel } from "../models/lib.model";
import { handleErrorResponse } from "../utils/errorHandler";
import { sendResponse } from "../utils/sendResponse";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = new LibModel(req.body); // receives data from client
    const savedBook = await book.save(); // saves to MongoDB

    sendResponse({
      res,
      statusCode: 201,
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
};
export const getBook = async (req: Request, res: Response) => {
  try {
    const sortBy = req.query.sortBy as string;
    const sortOrder = req.query.sort === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;

    const bookGenre = req.query.filter as string;
    const query = bookGenre ? { genre: bookGenre } : {};

    const books = await LibModel.find(query)
      .limit(limit)
      .sort({
        [sortBy]: sortOrder,
      });
    sendResponse({
      res,
      statusCode: 201,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
};
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getById = req.params.id;
    const book = await LibModel.findById(getById);
    if (!book) {
      // This is for not show the delete book
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    sendResponse({
      res,
      statusCode: 200,
      message: "Book get successfully",
      data: book,
    });
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
};

export const updateBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getById = req.params.id;
    const updateData = req.body;
    const book = await LibModel.findByIdAndUpdate(getById, updateData, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      throw new Error("Book not found");
    }
    sendResponse({
      res,
      statusCode: 200,
      message: "Book get successfully",
      data: book,
    });
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
};

export const deleteBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getById = req.params.id;
    await LibModel.findByIdAndDelete(getById);

    sendResponse({
      res,
      statusCode: 200,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    handleErrorResponse(res, error);
  }
};

//? Borrowing Books is starting from here

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

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
