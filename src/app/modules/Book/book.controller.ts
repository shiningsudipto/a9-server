import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { bookService } from "./book.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getAllBooksFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Books retrieved successfully!",
    data: result,
  });
});
const getBookById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bookId;
  const result = await bookService.getBookByIdFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book retrieved successfully!",
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bookId;
  const payload = req.body;
  const result = await bookService.updateBookIntoDB(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book updated successfully!",
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.bookId;
  const result = await bookService.deleteBookFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book successfully deleted",
    data: result,
  });
});
const createBook = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await bookService.createBookIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Book created successfully",
    data: result,
  });
});
const createManyBooks = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = bookService.createManyBooksIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Book created successfully",
    data: result,
  });
});

export const bookController = {
  getAllBooks,
  getBookById,
  createBook,
  createManyBooks,
  updateBook,
  deleteBook,
};
