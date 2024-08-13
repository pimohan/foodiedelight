import { ReactNode } from "react"; // Import the ReactNode type for flexible children

interface BaseProps {
  children: ReactNode; // Define the BaseProps interface with a children prop of type ReactNode
}

export const LoginLayout = ({ children }: BaseProps) => {
  // Create a functional component named LoginLayout
  return (
    <div data-testid="login-layout" className="login-layout">
      {children}
    </div> // Render a div with the class 'login-layout' to contain child components
  );
};
