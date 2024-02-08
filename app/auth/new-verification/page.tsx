import React from "react";
import NewVerificationForm from "./new-verification-form";
import AuthContent from "../auth-content";

const NewVarificationPage = () => {
  return (
    <AuthContent
      title="Create an account"
      buttonHref="/auth/login"
      buttonLable="Login"
    >
      <NewVerificationForm />
    </AuthContent>
  );
};

export default NewVarificationPage;
