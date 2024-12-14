import { Router } from "express";
import { OrderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", auth(UserRole.USER), OrderController.createOrder);
router.get("/", OrderController.getAllOrders);
router.get("/:id", OrderController.getOrderByUserId);
router.get("/shop-owner/:id", OrderController.getOrdersByShopOwnerId);

export const OrderRoutes = router;
