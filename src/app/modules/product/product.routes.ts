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
router.put(
  "/",
  multerUpload.fields([{ name: "images" }]),
  parseBody,
  productControllers.updateProduct
);
router.get("/", productControllers.getProducts);
router.delete("/", productControllers.deleteProduct);

export const ProductRoutes = router;
