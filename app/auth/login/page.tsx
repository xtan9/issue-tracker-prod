import AuthContent from "@/app/auth/auth-content";
import { APP_NAME } from "@/app/constants";
import LoginForm from "./login-form";

const LoginPage = () => {
  return (
    <AuthContent
      title={`Sign in to ${APP_NAME}`}
      buttonHref="/auth/signup"
      buttonLable="Sign Up"
      showSocial
      showAgreement
    >
      <LoginForm />
    </AuthContent>
  );
};

export default LoginPage;
