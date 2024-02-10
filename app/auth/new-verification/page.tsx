import AuthContent from "@/app/auth/auth-content";
import NewVerificationForm from "./new-verification-form";

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
