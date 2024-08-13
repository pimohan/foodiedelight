import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { useCanLogout } from "../../hooks/CanLogout";

// Mock dependencies
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../hooks/CanLogout", () => ({
  useCanLogout: jest.fn(),
}));

jest.mock("../../ui/Logo", () => ({
  Logo: () => <div data-testid="logo" />,
}));

jest.mock("./User", () => ({
  UserInfo: () => <div data-testid="user-info" />,
}));

describe("AdminLayout", () => {
  const navigate = jest.fn();
  const canLogout = true;

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useCanLogout as jest.Mock).mockReturnValue(canLogout);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders AdminLayout and initial elements", () => {
    render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );

    expect(screen.getByTestId("admin-layout")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-logo")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-menu")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("header-title")).toBeInTheDocument();
    expect(screen.getByTestId("user-info")).toBeInTheDocument();
    expect(screen.getByTestId("content-container")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("navigates to correct pages on menu click", () => {
    render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Profile"));
    expect(navigate).toHaveBeenCalledWith("profile");

    fireEvent.click(screen.getByText("Restaurants"));
    expect(navigate).toHaveBeenCalledWith("restaurants/list");

    fireEvent.click(screen.getByText("Logout"));
    expect(navigate).toHaveBeenCalledWith("/login");
  });
});
