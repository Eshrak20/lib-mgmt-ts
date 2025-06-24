import { model, Schema } from "mongoose";
import { LibBorrow } from "../interfaces/borrow.interface";


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

 

export const LibBorrowModel = model<LibBorrow>("LibBorrowModel",libBorrowSchema)
