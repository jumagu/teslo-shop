"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId },
    });

    if (!updatedOrder)
      return {
        ok: false,
        msg: `Order with id: '${orderId}' doesn't exist.`,
      };

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      msg: "An error occurred while updating the order.",
    };
  }
};
