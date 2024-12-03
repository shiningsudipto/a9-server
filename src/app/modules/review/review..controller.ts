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

const getReviewByProduct = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewServices.getReviewByProductFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review retrieved successfully",
    data: result,
  });
});

export const reviewControllers = {
  createReview,
  getReviewByProduct,
};
