import { Request } from "express";
import prisma from "../../shared/prisma";
import { initiatePayment } from "../payment/payment.utils";
import { TPaymentInfo } from "../payment/paymentinterface";

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
        total,
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

const getOrdersFromDB = async (query: Record<string, any>) => {
  const orderQuery = buildPrismaQuery({
    searchFields: ["status"],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    page: query.page,
    limit: query.limit,
  });

  const totalOrders = await prisma.order.count({
    where: orderQuery.where,
  });

  const totalPages = Math.ceil(totalOrders / orderQuery.take);

  const result = await prisma.order.findMany({
    ...orderQuery,
    include: {
      orderItem: true,
      user: true,
      shop: true,
      shippingAddress: true,
    },
  });

  return {
    meta: {
      total: totalOrders,
      limit: orderQuery.take,
      page: totalPages,
    },
    result,
  };
};

const getOrderByUserIdFromDB = async (query: Record<string, any>) => {
  const result = await prisma.order.findFirst({
    where: {
      userId: query.userId,
      orderItem: {
        some: {
          productId: query.productId,
        },
      },
    },
  });

  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getOrdersFromDB,
  getOrderByUserIdFromDB,
};
