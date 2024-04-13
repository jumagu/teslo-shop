"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user)
    return {
      ok: false,
      msg: "No user session.",
    };

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: {
          include: {
            country: true,
          },
        },
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error(`Order ${id} doesn't exist.`);

    if (session.user.role === "user") {
      if (session.user.id !== order.userId)
        throw new Error(
          `Order '${id}' doesn't belong to the user '${session.user.id}' of type '${session.user.role}'.`
        );
    }

    return {
      ok: true,
      order,
    };
  } catch (error: any) {
    return {
      ok: false,
      msg: error?.message,
    };
  }
};
