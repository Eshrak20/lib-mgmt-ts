// app/utils/sendResponse.ts

import { Response } from "express";

interface SendResponseProps<T> {
  res: Response;
  statusCode?: number;
  message: string;
  data?: T;
  success?: boolean;
}

export const sendResponse = <T>({
  res,
  statusCode = 200,
  message,
  data,
  success = true,
}: SendResponseProps<T>) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
