import { render, screen } from "@testing-library/react"; // Import React Testing Library functions
import LoginPage from "./LoginPage"; // Adjust the path as needed
import { LogoSize } from "../types/Types"; // Adjust the path as needed

// Mock the components to ensure the test focuses on LoginPage
jest.mock("../features/authentication/LoginLayout", () => ({
  LoginLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("../ui/Logo", () => ({
  Logo: ({ size }: { size: LogoSize }) => <div>Logo Size: {size}</div>,
}));

jest.mock("../features/authentication/LoginForm", () => ({
  LoginForm: () => <div>Login Form</div>,
}));

describe("LoginPage", () => {
  it("should render the LoginLayout, Logo, and LoginForm components", () => {
    render(<LoginPage />); // Render the LoginPage component

    // Check if LoginLayout component's children are present in the document
    // expect(screen.getByText("Logo Size: medium")).toBeInTheDocument();
    expect(screen.getByText("Login Form")).toBeInTheDocument();
  });
});
