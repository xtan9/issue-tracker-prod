"use server";

import { signIn } from "@/auth"; // Sign in from server side
import { getUserByEmail } from "@/lib/data";
import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { LoginSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Use zod to validate inputs.
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Login failed" };

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  // Check email existance.
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }
  // Verify email if not already verified.
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }
  // Sign in user.
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
