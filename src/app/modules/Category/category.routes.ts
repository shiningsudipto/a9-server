import express from "express";
import { categoryControllers } from "./category.controller";

const router = express.Router();

router.post("/", categoryControllers.createCategory);
router.put("/", categoryControllers.updateCategory);
router.get("/", categoryControllers.getALlCategory);
router.delete("/", categoryControllers.deleteCategory);

export const CategoryRoutes = router;
