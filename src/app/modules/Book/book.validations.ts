import { z } from "zod";

const createBookValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Book title is required." }),
    genre: z.string({ required_error: "Book genre is required." }),
    publishedYear: z
      .number({ invalid_type_error: "Published year must be a number" })
      .int({ message: "Published year must be an integer" })
      .min(1000, { message: "Published year must be a valid year" })
      .max(new Date().getFullYear(), {
        message: "Published year cannot be in the future",
      }),
    totalCopies: z
      .number({
        required_error: "Book total copies is required.",
      })
      .int({ message: "Total copies must be an integer." }),
    availableCopies: z
      .number({
        required_error: "Book available copies is required.",
      })
      .int({ message: "Available copies must be an integer." })
      .min(0, { message: "Available copies cannot be negative." }),
  }),
});

const updateBookValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    genre: z.string().optional(),
    publishedYear: z.number().optional(),
    totalCopies: z.number().optional(),
    availableCopies: z.number().optional(),
  }),
});

export const bookValidationSchema = {
  createBookValidationSchema,
  updateBookValidationSchema,
};
