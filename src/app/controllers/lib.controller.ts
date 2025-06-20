import { Request, Response } from "express";
import { LibModel } from "../models/lib.model";

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = new LibModel(req.body); // receives data from client
    const savedBook = await book.save(); // saves to MongoDB

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        message: "Validation failed",
        success: false,
        error: {
          name: error.name,
          errors: error.errors, // This is the main brefing of full error description
        },
      });
    } else {
      // Generic server error
      res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: {
          name: error.name || "UnknownError",
          message: error.message || "Internal Server Error",
        },
      });
    }
  }
};
