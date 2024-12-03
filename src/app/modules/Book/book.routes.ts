import express from "express";
import { bookController } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import { bookValidationSchema } from "./book.validations";

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.post(
  "/",
  validateRequest(bookValidationSchema.createBookValidationSchema),
  bookController.createBook
);
router.get("/:bookId", bookController.getBookById);
router.put(
  "/:bookId",
  validateRequest(bookValidationSchema.updateBookValidationSchema),
  bookController.updateBook
);
router.delete("/:bookId", bookController.deleteBook);
router.post("/many", bookController.createManyBooks);

export const BookRoutes = router;
