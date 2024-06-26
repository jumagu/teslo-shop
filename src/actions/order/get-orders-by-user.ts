"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user)
    return {
      ok: false,
      msg: "No user session.",
    };

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
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
