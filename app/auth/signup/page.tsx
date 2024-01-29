import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Authentication forms built using the components.",
};

const SignUpPage = () => {
  return (
    <>
      <Link
        href="/auth/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-5"
        )}
      >
        Login
      </Link>
      <h1 className="text-2xl text-center font-semibold tracking-tight">
        Create an account
      </h1>
      <SignupForm />
    </>
  );
};

export default SignUpPage;
