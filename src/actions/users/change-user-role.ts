"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin")
    return {
      ok: false,
      return: "Unathorized user error.",
    };

  try {
    const newRole = role === "admin" ? "admin" : "user";

    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error: any) {
    return {
      ok: false,
      msg: error.message,
    };
  }
};
