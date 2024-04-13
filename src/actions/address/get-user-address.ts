"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({ where: { userId } });

    if (!address) return null;

    const { countryId, addressLineTwo, id, userId: _, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      addressLineTwo: addressLineTwo ? addressLineTwo : "",
    };
  } catch (error) {
    return null;
  }
};
