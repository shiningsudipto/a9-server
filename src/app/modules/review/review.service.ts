import { Request } from "express";
import prisma from "../../shared/prisma";

const createReviewIntoDB = async (req: Request) => {
  const payload = req.body;
  const reviewData = {
    userId: payload.userId,
    productId: payload.productId,
    rating: payload.rating,
    comment: payload.comment,
  };
  const result = await prisma.review.create({
    data: reviewData,
  });
  await prisma.orderItem.update({
    where: {
      id: payload.orderId,
    },
    data: {
      reviewed: true,
    },
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

const getReviewByUserFromDB = async (id: string) => {
  const result = await prisma.review.findMany({
    where: {
      userId: id,
    },
  });
  return result;
};

const updateReviewIntoDB = async (req: Request) => {
  const payload = req.body;
  const result = await prisma.review.update({
    where: {
      id: payload.id,
    },
    data: payload,
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
  getReviewByUserFromDB,
  updateReviewIntoDB,
};
