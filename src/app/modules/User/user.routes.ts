import express from "express";
import { userControllers } from "./user.controller";
import { parseBody } from "../../middlewares/bodyParser";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/create",
  multerUpload.single("avatar"),
  parseBody,
  userControllers.createUser
);
router.put(
  "/update/:id",
  multerUpload.single("avatar"),
  parseBody,
  userControllers.updateUser
);
router.get("/all", userControllers.getAllUser);
router.get("/:id", userControllers.getUserById);
router.delete("/delete", userControllers.deleteUser);

export const UserRoutes = router;
