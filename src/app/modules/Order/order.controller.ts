import { Request, Response } from "express";
import { OrderService } from "./order.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrderIntoDB(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

const getOrderByUserId = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderService.getOrderByUserIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

const getOrdersByShopOwnerId = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 10; // Default limit: 10
    const page = parseInt(req.query.page as string) || 1; // Default page: 1
    const result = await OrderService.getOrderByShopOwnerIdFromDB(id, {
      limit,
      page,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order retrieved successfully",
      data: result,
    });
  }
);

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrdersFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderByUserId,
  getOrdersByShopOwnerId,
};
