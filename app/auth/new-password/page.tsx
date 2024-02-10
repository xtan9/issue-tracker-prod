import AuthContent from "@/app/auth/auth-content";
import NewPasswordForm from "./new-password-form";

const ResetPage = () => {
  return (
    <AuthContent
      title="Update your password"
      buttonHref="/auth/login"
      buttonLable="Login"
    >
      <NewPasswordForm />
    </AuthContent>
  );
};

export default ResetPage;
