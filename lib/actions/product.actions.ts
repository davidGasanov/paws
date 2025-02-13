"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { insertProductSchema, updateProductSchema } from "../validators";

// Get latest products
export async function getLatestProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: LATEST_PRODUCTS_LIMIT,
  });
  return convertToPlainObject(products);
}

// Get single product by its slug
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });
  return convertToPlainObject(product);
}

// Get all products
export async function getAllProducts({
  limit = PAGE_SIZE,
  page,
  query,
  category,
}: {
  limit?: number;
  page: number;
  query: string;
  category?: string;
}) {
  try {
    const data = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
    });

    const dataCount = await prisma.product.count();

    if (!data) {
      throw new Error("Error fetching products");
    }

    return { data, totalPages: Math.ceil(dataCount / limit) };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Delete a product

export async function deleteProduct(id: string) {
  try {
    const productExist = await prisma.product.findFirst({ where: { id } });

    if (!productExist) throw new Error("Product not found");

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");

    return { success: true, message: "Deleted succesfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Create product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    const product = insertProductSchema.parse(data);

    await prisma.product.create({
      data: product,
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Product created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// Update product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    const product = updateProductSchema.parse(data);
    const productExists = getProductBySlug(data.slug);

    if (!productExists) throw new Error("Product not found");

    await prisma.product.update({
      where: { id: product.id },
      data: product,
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
