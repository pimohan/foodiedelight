// UserProfile.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import UserProfile from "./UserProfile"; // Adjust import based on your file structure
import { useAuth } from "../../contexts/AuthContext";

// Mock dependencies
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../ui/PageHeader", () => ({
  PageHeader: () => <div>Page Header</div>,
}));

// Setup mocks
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe("UserProfile Component", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      username: "Test User",
      isAuthenticated: true,
      setUsername: (v) => "sdfdsf",
      login: () => {},
      logout: () => {},
    });
  });

  it("should render the PageHeader component", () => {
    render(<UserProfile />);
    expect(screen.getByText("Page Header")).toBeInTheDocument();
  });

  it("should render the username in the form", () => {
    render(<UserProfile />);

    // Check if the username input field contains the correct value
    expect(screen.getByDisplayValue("testuser")).toBeInTheDocument();
  });

  it("should render other form fields with correct initial values", () => {
    render(<UserProfile />);

    // Check values for other form fields
    expect(screen.getByDisplayValue("User One")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("admin@thinkbridge.in")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Admin")).toBeInTheDocument();
  });

  it("should have readOnly inputs", () => {
    render(<UserProfile />);

    // Check that all inputs are read-only
    expect(screen.getAllByRole("textbox")).toHaveLength(4); // All inputs should be found
    screen.getAllByRole("textbox").forEach((input) => {
      expect(input).toHaveAttribute("readOnly");
    });
  });
});
