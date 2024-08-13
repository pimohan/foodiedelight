import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  element: JSX.Element;
}

// Define an interface for the component props
export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  // Define a functional component named ProtectedRoute
  const { isAuthenticated } = useAuth(); // Get the isAuthenticated flag from the authentication context

  return isAuthenticated ? ( // Check if the user is authenticated
    element // If authenticated, render the provided element
  ) : (
    <Navigate to="/login" replace />
  ); // If not authenticated, redirect to login page
};
