import express from "express";
import { UserRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ProductRoutes } from "../modules/product/product.routes";
import { ShopRoutes } from "../modules/Shop/shop.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { CouponRoutes } from "../modules/Coupon/coupon.routes";
import { FollowerRoutes } from "../modules/Follower/follower.routes";
import { CategoryRoutes } from "../modules/Category/category.routes";
import { OrderRoutes } from "../modules/Order/order.routes";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/shop",
    route: ShopRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/coupon",
    route: CouponRoutes,
  },
  {
    path: "/follower",
    route: FollowerRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
