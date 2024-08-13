// ProtectedRoute.test.tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute"; // Ensure correct path and named import
import { useAuth } from "../../contexts/AuthContext";

// Mock the useAuth hook
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Define a mock element for testing
const mockElement = <div>Protected Content</div>;

test("redirects to login when not authenticated", () => {
  (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });

  render(
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute element={mockElement} />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </Router>
  );

  expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
});
