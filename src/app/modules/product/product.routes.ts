import express from "express";
import { parseBody } from "../../middlewares/bodyParser";
import { multerUpload } from "../../config/multer.config";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post(
  "/",
  multerUpload.fields([{ name: "images" }]),
  parseBody,
  productControllers.createPost
);
router.get("/", productControllers.getProducts);

export const ProductRoutes = router;
