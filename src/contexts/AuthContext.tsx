import { createContext, useState, useContext, useEffect } from "react";
import { BaseProps } from "./../interfaces/BaseProps";

// Creates a context object for authentication state
const AuthContext = createContext({
  // Default values for context
  isAuthenticated: false,
  username: "",
  // Functions to update authentication state
  setUsername: (value: string) => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: BaseProps) => {
  // State to manage authentication and username
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  // Check for existing token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to set authentication to true
  const login = () => {
    localStorage.setItem("authToken", "newAuthTocken");
    setIsAuthenticated(true);
  };

  // Function to set authentication to false
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Provides authentication context to children
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);
