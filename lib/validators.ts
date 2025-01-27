import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const currency = z
  .string()
  .refine(
    (val) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(val))),
    "Price must have exactly 2 decimal places"
  );

// Schema for inserting products

export const insertProductSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255, "Name must be at most 255 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(255, "Slug must be at most 255 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for signing in

export const signInFormSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for signup

export const signUpFormSchema = z
  .object({
    email: z.string().email("Please provide a valid email"),
    name: z.string().min(3, "Name must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product Id is required"),
  name: z.string().min(1, "Name is required"),
  price: currency,
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().positive("Must be a positive number"),
  image: z.string().min(1, "Image is required"),
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  totalPrice: currency,
  itemsPrice: currency,
  taxPrice: currency,
  shippingPrice: currency,
  userId: z.string().optional().nullable(),
  sessionCartId: z.string().min(1, "Session Cart Id is required"),
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  streetAddress: z
    .string()
    .min(3, "Street address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  country: z.string().min(3, "Country must be at least 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((schema) => PAYMENT_METHODS.includes(schema.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

