import express from "express";
import { reviewControllers } from "./review..controller";

const router = express.Router();

router.post("/", reviewControllers.createReview);
router.get("/:id", reviewControllers.getReviewByProduct);
router.post("/update", reviewControllers.updateReview);
router.get("/user/:id", reviewControllers.getReviewByUser);
router.get("/shop-owner/:id", reviewControllers.getReviewByShopOwner);

export const ReviewRoutes = router;
