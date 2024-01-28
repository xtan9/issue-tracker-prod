import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import UserSignupForm from "./user-signup-form";

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
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <UserSignupForm />
    </>
  );
};

export default SignUpPage;
