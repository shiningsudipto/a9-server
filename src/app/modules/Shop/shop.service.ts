import { Request } from "express";
import prisma from "../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { TPaginationQuery } from "../Order/order.service";

const createShopIntoDB = async (req: Request) => {
  const shopInfo = req.body;
  const file = req.file?.path;
  const payload = {
    ...shopInfo,
    logo: file,
  };
  const result = await prisma.shop.create({
    data: payload,
  });
  return result;
};

const updateShopIntoDB = async (req: Request) => {
  const shopInfo = req.body;
  const file = req.file?.path;
  const payload = {
    ...shopInfo,
    ...(file ? { logo: file } : {}),
  };
  const result = await prisma.shop.update({
    where: {
      id: shopInfo.id,
    },
    data: payload,
  });
  return result;
};

const getShopByVendorFromDB = async (
  id: string,
  { limit, page }: TPaginationQuery
) => {
  const skip = (page - 1) * limit;

  const result = await prisma.shop.findUnique({
    where: {
      ownerId: id,
    },
    include: {
      Product: {
        skip: skip, // Offset for pagination
        take: limit, // Limit per page
      },
      Order: true,
      Follower: true,
    },
  });

  if (!result) {
    throw new ApiError(404, "Shop not found!");
  }

  // Get total count of products for pagination meta
  const totalProducts = await prisma.product.count({
    where: {
      shopId: result.id,
    },
  });

  return {
    shop: result,
    products: result.Product, // Paginated products
    meta: {
      total: totalProducts,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalProducts / limit),
    },
  };
};

const getShopByIdFromDB = async (id: string) => {
  const result = await prisma.shop.findUnique({
    where: {
      id,
    },
    include: {
      Product: true,
      Order: true,
      Follower: true,
    },
  });
  if (!result) {
    throw new ApiError(404, "Shop not found!");
  }
  return result;
};

const getAllShopFromDB = async () => {
  const result = await prisma.shop.findMany({
    include: {
      owner: true,
    },
  });
  return result;
};

export const shopServices = {
  createShopIntoDB,
  updateShopIntoDB,
  getShopByVendorFromDB,
  getAllShopFromDB,
  getShopByIdFromDB,
};
