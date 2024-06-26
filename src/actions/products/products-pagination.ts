"use server";

import prisma from "@/lib/prisma";
import type { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
  query?: string;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
  query,
}: PaginationOptions) => {
  if (
    gender &&
    gender !== "men" &&
    gender !== "women" &&
    gender !== "kids" &&
    gender !== "unisex"
  )
    return null;

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const [products, productsCount] = await Promise.all([
      prisma.product.findMany({
        take,
        skip: (page - 1) * take,
        include: {
          ProductImage: { take: 2, select: { url: true } },
        },
        where: { gender, title: { contains: query, mode: "insensitive" } },
        orderBy: {
          gender: "asc",
        },
      }),
      prisma.product.count({
        where: { gender, title: { contains: query, mode: "insensitive" } },
      }),
    ]);

    const totalPages = Math.ceil(productsCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("An error occurred when querying products.");
  }
};
