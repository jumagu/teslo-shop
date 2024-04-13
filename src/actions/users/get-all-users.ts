"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";

export const getAllUsers = async () => {
  const session = await auth();

  if (session?.user.role !== "admin")
    return {
      ok: false,
      msg: "Unathorized user error.",
    };

  const users = await prisma.user.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return {
    ok: true,
    users,
  };
};
