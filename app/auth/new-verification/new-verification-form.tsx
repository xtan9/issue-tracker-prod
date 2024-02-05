"use client";

import { BeatLoader } from "react-spinners";
import AuthContent from "../auth-content";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    console.log(token);
  }, [token]);
  return (
    <AuthContent
      title="Create an account"
      buttonHref="/auth/login"
      buttonLable="Login"
    >
      <div className="flex items-center justify-center">
        <BeatLoader />
      </div>
    </AuthContent>
  );
};

export default NewVerificationForm;
