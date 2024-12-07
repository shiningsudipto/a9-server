-- AlterTable
ALTER TABLE "product" ADD COLUMN     "flashSale" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "status" "ShopStatus" NOT NULL DEFAULT 'Active';
