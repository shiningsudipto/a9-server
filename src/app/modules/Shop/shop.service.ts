import { Request } from "express";
import prisma from "../../shared/prisma";
import ApiError from "../../errors/ApiError";

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
  console.log(shopInfo);
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

const getShopByVendorFromDB = async (id: string) => {
  const result = await prisma.shop.findUnique({
    where: {
      ownerId: id,
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
};
