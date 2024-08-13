import { renderHook } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import { useCanLogout } from "./CanLogout";

// Mock the useLocation hook from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("useCanLogout", () => {
  it("should return true when pathname includes 'list'", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/some/list/path",
    });

    const { result } = renderHook(() => useCanLogout());

    expect(result.current).toBe(true);
  });

  it("should return true when pathname includes 'profile'", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/some/profile/path",
    });

    const { result } = renderHook(() => useCanLogout());

    expect(result.current).toBe(true);
  });

  it("should return false when pathname does not include 'list' or 'profile'", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/some/other/path",
    });

    const { result } = renderHook(() => useCanLogout());

    expect(result.current).toBe(false);
  });
});
