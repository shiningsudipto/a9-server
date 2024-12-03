import ApiError from "../../errors/ApiError";
import prisma from "../../shared/prisma";
import httpStatus from "http-status";
import { TBook } from "./book.type";

const getAllBooksFromDB = async () => {
  const result = await prisma.book.findMany();
  return result;
};

const createBookIntoDB = async (payload: TBook) => {
  const result = await prisma.book.create({
    data: payload,
  });
  return result;
};

const getBookByIdFromDB = async (bookId: string) => {
  console.log("hit", bookId);
  const result = await prisma.book.findUnique({
    where: { bookId },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found");
  }
  return result;
};
const updateBookIntoDB = async (bookId: string, payload: Partial<TBook>) => {
  const isBookAvailable = await prisma.book.findUnique({
    where: { bookId },
  });
  if (!isBookAvailable) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not available.");
  }
  const result = await prisma.book.update({
    where: {
      bookId,
    },
    data: payload,
  });
  return result;
};
const deleteBookFromDB = async (bookId: string) => {
  const isBookAvailable = await prisma.book.findUnique({
    where: { bookId },
  });
  if (!isBookAvailable) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not available.");
  }
  const result = await prisma.book.delete({
    where: {
      bookId,
    },
  });
  return result;
};

const createManyBooksIntoDB = async (payload: TBook[]) => {
  return await prisma.book.createMany({
    data: payload,
  });
};

export const bookService = {
  getAllBooksFromDB,
  createBookIntoDB,
  createManyBooksIntoDB,
  getBookByIdFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
