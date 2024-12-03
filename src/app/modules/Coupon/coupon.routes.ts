import express from "express";
import { couponControllers } from "./coupon.controller";

const router = express.Router();

router.post("/", couponControllers.createCoupon);
router.post("/", couponControllers.getMatchedCoupon);
router.get("/", couponControllers.getAllCoupon);

export const CouponRoutes = router;
