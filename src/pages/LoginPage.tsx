import { Logo } from "../ui/Logo";
import { LoginForm } from "../features/authentication/LoginForm";
import { LoginLayout } from "../features/authentication/LoginLayout";
import { LogoSize } from "../types/Types";

// LoginPage component renders the login page layout with a logo and login form
const LoginPage = () => {
  return (
    <LoginLayout>
      {/* Renders the logo with medium size */}
      <Logo size={LogoSize.Medium} />
      {/* Renders the login form */}
      <LoginForm />
    </LoginLayout>
  );
};

export default LoginPage;
