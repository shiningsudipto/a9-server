import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { categoryServices } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.createCategoryIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.updateCategoryIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.deleteCategoryFromDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category deleted successfully",
    data: result,
  });
});

const getALlCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getAllCategoryFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category retrieved successfully",
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  updateCategory,
  deleteCategory,
  getALlCategory,
};
