import { z } from "zod";

export const productSchema = z.object({
  productInfo: z
    .string( "Product Info is required" )
    .min(2, "Product Info must be at least 2 characters"),

  category: z
    .string( "Category is required" )
    .min(2, "Category must be at least 2 characters"),

  stock: z
    .number( "Stock quantity is required" )
    .int()
    .nonnegative("Stock cannot be negative"),

  suppliers: z
    .array(
      z.string( "Supplier name must be a string" ).min(1),
    )
    .optional()
    .default([]),

  price: z
    .number( "Price is required" )
    .nonnegative("Price cannot be negative"),
});

// TS type
export type ProductData = z.infer<typeof productSchema>;
