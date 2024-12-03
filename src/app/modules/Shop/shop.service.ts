import { Request } from "express";
import prisma from "../../shared/prisma";

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
  return "result";
};

const updateShopIntoDB = async (req: Request) => {
  const { id } = req.params;
  const shopInfo = req.body;
  const file = req.file?.path;
  const payload = {
    ...shopInfo,
    ...(file ? { logo: file } : {}),
  };
  const result = await prisma.shop.update({
    where: {
      id,
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
  });
  return result;
};

const getAllShopFromDB = async () => {
  const result = await prisma.shop.findMany();
  return result;
};

export const shopServices = {
  createShopIntoDB,
  updateShopIntoDB,
  getShopByVendorFromDB,
  getAllShopFromDB,
};
