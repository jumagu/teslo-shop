"use server";

import prisma from "@/lib/prisma";
import { Address } from "@/interfaces";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    return {
      ok: false,
      msg: "Unable to record the address",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const dbAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      addressLineTwo: address.addressLineTwo,
      zipCode: address.zipCode,
      city: address.city,
      mobilePhoneNumber: address.mobilePhoneNumber,
      rememberAddress: address.rememberAddress ?? false,
      countryId: address.country,
      userId: userId,
    };

    if (!dbAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    throw new Error("Unable to record the address.");
  }
};
