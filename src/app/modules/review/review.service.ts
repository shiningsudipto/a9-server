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

const getReviewsByShopOwnerIdFromDB = async (ownerId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      product: {
        shop: {
          ownerId: ownerId,
        },
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      product: {
        select: {
          name: true,
          shop: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return reviews;
};

export const reviewServices = {
  createReviewIntoDB,
  getReviewByProductFromDB,
  getReviewsByShopOwnerIdFromDB,
};
