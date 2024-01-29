"use server";

import { SignupSchema } from "@/schemas/auth";
import * as z from "zod";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Sign up failed" };
};
