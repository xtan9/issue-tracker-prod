import Agreement from "@/app/auth/agreement";
import Social from "@/app/auth/social";
import { APP_NAME } from "@/app/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  buttonLable: string;
  buttonHref: string;
  showSocial?: boolean;
  showAgreement?: boolean;
}

const AuthContent = ({
  children,
  title,
  buttonLable,
  buttonHref,
  showSocial,
  showAgreement,
}: Props) => {
  return (
    <>
      <Link
        href={buttonHref}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-5"
        )}
      >
        {buttonLable}
      </Link>
      <h1 className="text-2xl text-center font-semibold tracking-tight">
        {title}
      </h1>
      {children}
      {showSocial && <Social />}
      {showAgreement && <Agreement />}
    </>
  );
};

export default AuthContent;
