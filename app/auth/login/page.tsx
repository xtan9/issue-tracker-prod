import { APP_NAME } from "@/app/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <>
      <Link
        href="/auth/signup"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-5"
        )}
      >
        Sign up
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight text-center">
        Sign in to {APP_NAME}
      </h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;
