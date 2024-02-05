"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";
import { SignupSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/lib/data";
import db from "@/lib/db";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/email";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  // Use zod to validate inputs.
  const validatedFields = SignupSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Sign up failed" };

  const { name, email, password } = validatedFields.data;
  // Check email duplication.
  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "Email already in use!" };
  // Hash password and create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({ data: { name, email, password: hashedPassword } });
  // Send verification token to email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
