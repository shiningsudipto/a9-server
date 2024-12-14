import { Request } from "express";
import prisma from "../../shared/prisma";
import { initiatePayment } from "../payment/payment.utils";
import { TPaymentInfo } from "../payment/paymentinterface";
import { OrderStatus } from "@prisma/client";

interface TItems {
  productId: string;
  quantity: number;
  price: number;
}

const createOrderIntoDB = async (req: Request) => {
  const result = await prisma.$transaction(async (prisma) => {
    const { userId, shopId, total, items, phone, address } = req.body;

    const isExistUser = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const transactionId = `TXN-${Date.now()}${
      Math.floor(10000 + Math.random()) * 90000
    }`;

    const order = await prisma.order.create({
      data: {
        userId,
        shopId,
        total: parseFloat(total),
        transactionId,
        items: {
          create: items?.map((item: TItems) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            userId,
          })),
        },
      },
    });

    const paymentInfo: TPaymentInfo = {
      transactionId,
      amount: total,
      customerName: isExistUser.name,
      customerEmail: isExistUser.email,
      customerPhone: phone,
      customerAddress: address,
    };

    const paymentResponse = await initiatePayment(paymentInfo);

    return {
      order,
      paymentResponse,
    };
  });

  return result;
};

const getOrderByUserIdFromDB = async (id: string) => {
  const result = await prisma.order.findMany({
    where: {
      userId: id,
      status: OrderStatus.Complete,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  return result;
};

export interface TPaginationQuery {
  limit: number;
  page: number;
}

const getOrderByShopOwnerIdFromDB = async (
  ownerId: string,
  { limit, page }: TPaginationQuery
) => {
  const skip = (page - 1) * limit; // Calculate the number of records to skip

  const result = await prisma.order.findMany({
    where: {
      shop: {
        ownerId: ownerId,
      },
      status: OrderStatus.Complete,
    },
    include: {
      user: true,
    },
    take: limit, // Limit the number of results per page
    skip: skip, // Skip records for pagination
  });

  // Optional: Count total orders for this query
  const total = await prisma.order.count({
    where: {
      shop: {
        ownerId: ownerId,
      },
      status: OrderStatus.Complete,
    },
  });

  return {
    data: result,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAllOrdersFromDB = async () => {
  const result = await prisma.order.findMany({
    where: {
      status: OrderStatus.Complete,
    },
    include: {
      items: true,
      user: true,
    },
  });
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getOrderByUserIdFromDB,
  getOrderByShopOwnerIdFromDB,
  getAllOrdersFromDB,
};
