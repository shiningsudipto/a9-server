-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Complete', 'Pending');

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'Pending';

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
