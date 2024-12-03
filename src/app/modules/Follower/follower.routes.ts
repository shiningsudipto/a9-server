import express from "express";
import { followerControllers } from "./follower.controller";

const router = express.Router();

router.post("/", followerControllers.createFollower);
router.get("/shop/:id", followerControllers.getFollowerByShop);
router.get("/user/:id", followerControllers.getFollowingShopByUser);

export const FollowerRoutes = router;
