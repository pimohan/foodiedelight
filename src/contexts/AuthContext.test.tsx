import { act } from "react";
import { renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext"; // Adjust the path as needed

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("useAuth", () => {
  it("should return the context values", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.username).toBe("");
  });

  it("should update authentication state on login and logout", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Initial state
    expect(result.current.isAuthenticated).toBe(false);

    // Login
    act(() => {
      result.current.login();
    });
    expect(result.current.isAuthenticated).toBe(true);

    // Logout
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("should update and return the username", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Set username
    act(() => {
      result.current.setUsername("newUser");
    });
    expect(result.current.username).toBe("newUser");
  });
});
