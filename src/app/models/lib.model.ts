import { Model, model, Schema } from "mongoose";
import { Lib, LibBorrow } from "../interfaces/lib.interface";

interface LibModelType extends Model<Lib> {
  // eslint-disable-next-line no-unused-vars
  updateAvailability(id: string, quantity: number): Promise<void>;
} 
const libSchema = new Schema<Lib,LibModelType>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const libBorrowSchema = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

libSchema.statics.updateAvailability = async function (
  id: string,
  quantity: number
) {
  const book = await this.findById(id);
  if (book) {
    if (book.copies < quantity) {
      throw new Error("Not enough copies available");
    }
    book.copies = book.copies - quantity;

    if (book.copies > 0) {
      book.available = true;
    } else {
      book.available = false;
    }

    await book.save();
  }
  else {
    throw new Error("Book not found");
  }
};

export const LibBorrowModel = model<LibBorrow>("LibBorrowModel",libBorrowSchema)
export const LibModel = model<Lib,LibModelType>("LibModel", libSchema);
