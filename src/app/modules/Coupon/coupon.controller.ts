import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import { Request, Response } from "express";
import sendResponse from "../../shared/sendResponse";
import { couponServices } from "./coupon.service";

const createCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await couponServices.createCouponIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Coupon created successfully",
    data: result,
  });
});

const getMatchedCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await couponServices.createCouponIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Coupon retrieved successfully",
    data: result,
  });
});

const getAllCoupon = catchAsync(async (req: Request, res: Response) => {
  const result = await couponServices.getCouponFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Coupon retrieved successfully",
    data: result,
  });
});

export const couponControllers = {
  createCoupon,
  getMatchedCoupon,
  getAllCoupon,
};
