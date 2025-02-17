"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject, formatError } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../constants";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { insertProductSchema, updateProductSchema } from "../validators";
import { Prisma } from "@prisma/client";

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

// Get single product by its id
export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });
  return convertToPlainObject(data);
}

// Get all products
export async function getAllProducts({
  limit = PAGE_SIZE,
  page,
  query,
  category,
  price,
  rating,
  sort,
}: {
  limit?: number;
  page: number;
  query: string;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
}) {
  const queryFilter: Prisma.ProductWhereInput =
    query && query !== "all"
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          } as Prisma.StringFilter,
        }
      : {};

  const categoryFilter =
    category && category !== "all"
      ? {
          category,
        }
      : {};

  const priceFilter: Prisma.ProductWhereInput =
    price && price !== "all"
      ? {
          price: {
            gte: Number(price.split("-")[0]),
            lte: Number(price.split("-")[1]),
          },
        }
      : {};

  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            gte: Number(rating),
          },
        }
      : {};

  try {
    const data = await prisma.product.findMany({
      orderBy:
        sort === "lowest"
          ? { price: "asc" }
          : sort === "highest"
          ? { price: "desc" }
          : sort === "rating"
          ? {
              rating: "desc",
            }
          : { createdAt: "desc" },
      take: limit,
      skip: (page - 1) * limit,
      where: {
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      },
    });

    const dataCount = await prisma.product.count({ where: queryFilter });

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

// Get all categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ["category"],
    _count: true,
  });

  return data;
}

// Get featured products
export async function getFeaturedProducts() {
  const data = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return convertToPlainObject(data);
}
