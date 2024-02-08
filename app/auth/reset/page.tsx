import AuthContent from "../auth-content";
import { ResetForm } from "./reset-form";

const ResetPage = () => {
  return (
    <AuthContent
      title="Reset your password"
      buttonHref="/auth/login"
      buttonLable="Login"
    >
      <ResetForm />
    </AuthContent>
  );
};

export default ResetPage;
