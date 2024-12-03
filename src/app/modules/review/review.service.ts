import { Request } from "express";
import prisma from "../../shared/prisma";

const createReviewIntoDB = async (req: Request) => {
  const payload = req.body;
  const result = await prisma.review.create({
    data: payload,
  });
  return result;
};

const getReviewByProductFromDB = async (id: string) => {
  const result = await prisma.review.findMany({
    where: {
      productId: id,
    },
  });
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
  getReviewByProductFromDB,
};
