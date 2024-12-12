import { Request } from "express";
import prisma from "../../shared/prisma";
import ApiError from "../../errors/ApiError";

const createCouponIntoDB = async (req: Request) => {
  const payload = req.body;
  const result = await prisma.coupon.create({
    data: payload,
  });
  return result;
};
const getCouponFromDB = async () => {
  const result = await prisma.coupon.findMany();
  return result;
};

const getMatchedCouponFromDB = async (req: Request) => {
  const payload = req.body;
  const code = payload.code as string;
  const result = await prisma.coupon.findUnique({
    where: {
      code: code,
    },
  });
  if (result) {
    return result;
  } else {
    throw new ApiError(404, "Coupon not found!");
  }
};

export const couponServices = {
  createCouponIntoDB,
  getCouponFromDB,
  getMatchedCouponFromDB,
};
