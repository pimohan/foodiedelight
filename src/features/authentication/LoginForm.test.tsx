import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "./LoginForm";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

// Mock useAuth and useNavigate
jest.mock("../../contexts/AuthContext");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("LoginForm", () => {
  const mockLogin = jest.fn();
  const mockSetUsername = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      setUsername: mockSetUsername,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form", () => {
    render(<LoginForm />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByTestId("login-card")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("remember-checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  });

  test("handles form submission successfully", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "Admin" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Admin@12345" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(mockSetUsername).toHaveBeenCalledWith("Admin");
      expect(mockLogin).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });
  });

  test("handles form submission failure", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(
        screen.getByText("Please input your username!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please input your password!")
      ).toBeInTheDocument();
    });
  });

  test("resets the form fields", () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "Admin" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "Admin@12345" },
    });

    fireEvent.click(screen.getByTestId("reset-button"));

    expect(screen.getByTestId("username-input")).toHaveValue("");
    expect(screen.getByTestId("password-input")).toHaveValue("");
  });
});
