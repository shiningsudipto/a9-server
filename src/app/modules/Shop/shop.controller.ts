import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { shopServices } from "./shop.service";

const createPost = catchAsync(async (req, res) => {
  const result = await shopServices.createShopIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop created successfully",
    data: result,
  });
});

const updateShop = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await shopServices.createShopIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop updated successfully",
    data: result,
  });
});

const getShopByVendor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await shopServices.getShopByVendorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop retrieved successfully",
    data: result,
  });
});

const getAllShop = catchAsync(async (req, res) => {
  const result = await shopServices.getAllShopFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Shop retrieved successfully",
    data: result,
  });
});

export const shopControllers = {
  createPost,
  updateShop,
  getShopByVendor,
  getAllShop,
};
