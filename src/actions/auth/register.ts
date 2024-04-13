"use server";

import bcryptjs from "bcryptjs";

export async function register(
  fullName: string,
  email: string,
  password: string
) {
  try {
    const user = await prisma?.user.create({
      data: {
        name: fullName,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },

      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user,
    };
  } catch (error: any) {
    switch (error.code) {
      case "P2002":
        return {
          ok: false,
          msg: "Sorry, this email address is already in use. Please try using a different email.",
        };

      default:
        return {
          ok: false,
          msg: "Error while creating the user.",
        };
    }
  }
}
