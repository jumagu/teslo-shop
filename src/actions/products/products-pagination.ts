"use server";

import prisma from "@/lib/prisma";
import type { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
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
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: { take: 2, select: { url: true } },
      },
      where: { gender },
      orderBy: {
        gender: "asc",
      },
    });

    if (!products) return null;

    const productsCount = await prisma.product.count({ where: { gender } });

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
    throw new Error("An error occurred when loading products.");
  }
};
