import express from "express";
import { userControllers } from "./user.controller";
import { parseBody } from "../../middlewares/bodyParser";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/",
  multerUpload.single("avatar"),
  parseBody,
  userControllers.createUser
);

export const UserRoutes = router;
