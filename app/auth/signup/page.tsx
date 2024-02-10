import AuthContent from "@/app/auth/auth-content";
import { Metadata } from "next";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Authentication forms built using the components.",
};

const SignUpPage = () => {
  return (
    <AuthContent
      title="Create an account"
      buttonHref="/auth/login"
      buttonLable="Login"
      showSocial
      showAgreement
    >
      <SignupForm />
    </AuthContent>
  );
};

export default SignUpPage;
