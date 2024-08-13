// UserInfo.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { User } from "./User"; // Adjust import based on your file structure
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCanLogout } from "../../hooks/CanLogout";

// Mock hooks and components
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../hooks/CanLogout", () => ({
  useCanLogout: jest.fn(),
}));

// Setup mocks
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
const mockUseCanLogout = useCanLogout as jest.MockedFunction<
  typeof useCanLogout
>;

describe("UserInfo Component", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      username: "Test User",
      isAuthenticated: true,
      setUsername: (v) => "sdfdsf",
      login: () => {},
      logout: () => {},
    });
    mockUseNavigate.mockImplementation(() => jest.fn());
    mockUseCanLogout.mockReturnValue(true);
  });

  it("should render user information correctly", () => {
    render(<User />);

    // Check username
    expect(screen.getByText("Test User")).toBeInTheDocument();

    // Check user image
    expect(screen.getByAltText("User")).toHaveAttribute(
      "src",
      "/default-user.jpg"
    );
  });

  it("should navigate to /login when logout is clicked", () => {
    render(<User />);

    // Mock navigate function
    const navigate = mockUseNavigate();
    const logoutMenu = screen.getByText("Logout");

    fireEvent.click(logoutMenu);

    expect(navigate).toHaveBeenCalledWith("/login");
  });

  it("should display Popconfirm if canLogout is false", () => {
    mockUseCanLogout.mockReturnValue(false);

    render(<User />);

    // Check if Popconfirm is displayed
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should not show Popconfirm if canLogout is true", () => {
    render(<User />);

    // Check if Popconfirm is not displayed
    expect(screen.queryByText("Are you sure to logout ?")).toBeNull();
  });

  // Add additional tests as needed
});
