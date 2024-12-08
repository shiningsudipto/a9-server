import express from "express";
import { shopControllers } from "./shop.controller";
import { multerUpload } from "../../config/multer.config";
import { parseBody } from "../../middlewares/bodyParser";

const router = express.Router();

router.post(
  "/",
  multerUpload.single("logo"),
  parseBody,
  shopControllers.createPost
);
router.put(
  "/",
  multerUpload.single("logo"),
  parseBody,
  shopControllers.updateShop
);
router.get("/", shopControllers.getAllShop);
router.get("/:id", shopControllers.getShopByVendor);
router.get("/details/:id", shopControllers.getShopByID);

export const ShopRoutes = router;
