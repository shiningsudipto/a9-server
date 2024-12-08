import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IFile } from "../../types/file";
import httpStatus from "http-status";
import { productServices } from "./product.service";
import pick from "../../shared/pick";
import { productFilterableFields } from "../../constants/searchAndFilter";

const createPost = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});
const duplicateProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProductIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product duplicated successfully",
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  const result = await productServices.updateProductIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await productServices.deleteProductFromDB(payload.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productServices.getProductByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const getFlashSaleProduct = catchAsync(async (req, res) => {
  const result = await productServices.getFlashSaleProductsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const filters = pick(req.query, productFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await productServices.getAllProductsFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

export const productControllers = {
  createPost,
  updateProduct,
  getProducts,
  getFlashSaleProduct,
  deleteProduct,
  duplicateProduct,
  getProductById,
};
