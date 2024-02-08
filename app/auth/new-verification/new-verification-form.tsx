"use client";

import { BeatLoader } from "react-spinners";
import AuthContent from "../auth-content";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token]);

  return (
    <AuthContent
      title="Create an account"
      buttonHref="/auth/login"
      buttonLable="Login"
    >
      <div className="flex items-center justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </AuthContent>
  );
};

export default NewVerificationForm;
