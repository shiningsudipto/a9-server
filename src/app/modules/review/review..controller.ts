import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { reviewServices } from "./review.service";
import httpStatus from "http-status";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewServices.createReviewIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewServices.updateReviewIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review updated successfully",
    data: result,
  });
});

const getReviewByProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewServices.getReviewByProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review retrieved successfully",
    data: result,
  });
});

const getReviewByUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewServices.getReviewByUserFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review retrieved successfully",
    data: result,
  });
});

const getReviewByShopOwner = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewServices.getReviewsByShopOwnerIdFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review retrieved successfully",
    data: result,
  });
});

export const reviewControllers = {
  createReview,
  getReviewByProduct,
  getReviewByShopOwner,
  getReviewByUser,
  updateReview,
};
