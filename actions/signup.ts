"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import db from "@/prisma/client";
import { SignupSchema } from "@/schemas/auth";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Sign up failed" };

  const { name, email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) return { error: "Email already in use!" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({ data: { name, email, password: hashedPassword } });

  // TODO: Send verification token email

  return { success: "User created!" };
};
