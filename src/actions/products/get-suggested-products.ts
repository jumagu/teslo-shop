"use server";

import prisma from "@/lib/prisma";

export const getSuggestedProducts = async (
  searchValue: string
): Promise<string[]> => {
  try {
    const suggesterItems = await prisma.product.findMany({
      take: 5,
      where: {
        title: {
          contains: searchValue,
          mode: "insensitive",
        },
      },
      select: {
        title: true,
      },
    });

    return [...suggesterItems.map((item) => item.title)];
  } catch (error) {
    return [];
  }
};
