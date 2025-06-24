import { Request, Response } from "express";
import { handleErrorResponse } from "../utils/errorHandler";
import { sendResponse } from "../utils/sendResponse";
import { LibModel } from "../models/book.model";

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
    const sortBy = (req.query.sortBy as string) || "createdAt";
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
    const book = await LibModel.findByIdAndDelete(getById,{
      runValidators: true,
    });
    if (!book) {
      throw new Error("Book not found");
    }
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
