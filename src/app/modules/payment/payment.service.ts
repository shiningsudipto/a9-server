import { OrderStatus } from "@prisma/client";
import config from "../../../config";
import prisma from "../../shared/prisma";
import { verifyPayment } from "./payment.utils";

const confirmationService = async (
  transactionId: string,
  status: string,
  paidStatus: string
) => {
  const verifyResponse = await verifyPayment(transactionId);

  if (verifyResponse && verifyResponse?.pay_status === "Successful") {
    await prisma.$transaction(async (prisma) => {
      const userData = await prisma.user.findUniqueOrThrow({
        where: {
          email: verifyResponse?.cus_email,
        },
      });

      const orderData = await prisma.order.findFirstOrThrow({
        where: {
          userId: userData.id,
          transactionId,
        },
        include: {
          items: true,
        },
      });

      await prisma.order.update({
        where: {
          id: orderData.id,
          transactionId,
        },
        data: {
          status: OrderStatus.Complete,
        },
      });
    });
  }

  const successTemplate = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .success {
            color: #4CAF50;
          }
          .cancel {
            color: #f44336;
          }
          .redirect-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            color: #fff;
          }
          .success-link {
            background-color: #4CAF50;
          }
          .cancel-link {
            background-color: #f44336;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="${status === "success" ? "success" : "cancel"}">
            Payment ${status === "success" ? "Successful" : "Canceled"}
          </h1>
          <a href="${config.client_url}" class="redirect-link ${
    status === "success" ? "success-link" : "cancel-link"
  }">
            ${status === "success" ? "Explore more" : "Retry Payment"}
          </a>
        </div>
      </body>
    </html>
  `;

  return successTemplate;
};

export const PaymentServices = {
  confirmationService,
};
