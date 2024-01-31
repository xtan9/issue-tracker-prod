"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import db from "@/prisma/client";
import { SignupSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/lib/data";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Sign up failed" };

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use!" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({ data: { name, email, password: hashedPassword } });

  // TODO: Send verification token email.

  return { success: "User created!" };
};
