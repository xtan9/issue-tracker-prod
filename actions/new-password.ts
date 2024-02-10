"use server";

import { getPasswordResetTokenByToken, getUserByEmail } from "@/lib/data";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas/auth";
import * as z from "zod";

export const setNewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Password does not meet the requirements." };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) return { error: "Email does not exist!" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  return { success: "Password updated!" };
};