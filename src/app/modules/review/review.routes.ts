import express from "express";
import { reviewControllers } from "./review..controller";

const router = express.Router();

router.post("/", reviewControllers.createReview);
router.get("/:id", reviewControllers.getReviewByProduct);
router.get("/shop-owner/:id", reviewControllers.getReviewByShopOwner);

export const ReviewRoutes = router;
