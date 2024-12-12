import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

router.post("/login", authController.loginUser);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);

export const AuthRoutes = router;
