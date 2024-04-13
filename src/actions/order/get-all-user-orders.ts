"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const getAllUserOrders = async () => {
  const session = await auth();

  if (!session?.user)
    return {
      ok: false,
      msg: "No user session.",
    };

  if (session?.user.role !== "admin")
    return {
      ok: false,
      msg: "Unathorized user error.",
    };

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders,
  };
};
