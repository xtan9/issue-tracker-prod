import db from "@/prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

export const getUserByID = async (id: string | undefined) => {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
};
