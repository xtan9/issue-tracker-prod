"use server";

import { LoginSchema } from "@/app/auth/login/login-form";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Login failed" };
};
