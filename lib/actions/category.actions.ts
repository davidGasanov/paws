"use server";

import { prisma } from "@/db/prisma";
import { formatError } from "../utils";
import { Category } from "@/types";

// Add a new category. need to update type
export const insertCategory = async ({
  data,
}: {
  data: { name: string; subcategories?: { name: string }[] };
}) => {
  try {
    await prisma.category.create({
      data: {
        name: data.name,
        subcategories: {
          create: data.subcategories,
        },
      },
    });
    return {
      success: true,
      message: "Category created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
};

// Get all categories
export async function getAllCategories(
  props?:
    | {
        primariesOnly?: boolean;
        excludeAll?: boolean;
      }
    | undefined
): Promise<Category[]> {
  const { primariesOnly, excludeAll } = props || {};
  const data = await prisma.category.findMany({
    include: {
      subcategories: {
        include: {
          _count: {
            select: {
              products: true,
            },
          },
        },
      },
      _count: {
        select: {
          products: true,
        },
      },
    },
    where: {
      ...(primariesOnly ? { parentId: null } : {}),
      ...(excludeAll ? { name: { not: "all" } } : {}),
    },
  });

  return data;
}

// Fetch all subcategories recursively
export async function getAllSubcategoriesById(
  categoryId: string
): Promise<string[]> {
  const subcategories = await prisma.category.findMany({
    where: { parentId: categoryId },
    select: { id: true },
  });

  const subcategoryIds = subcategories.map((subcategory) => subcategory.id);

  for (const subcategoryId of subcategoryIds) {
    const nestedSubcategories = await getAllSubcategoriesById(subcategoryId);
    subcategoryIds.push(...nestedSubcategories);
  }

  return subcategoryIds;
}
