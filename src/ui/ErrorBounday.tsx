import React, { ReactNode, useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: ReactNode; // Content to be rendered if no error occurs
  fallback: ReactNode; // Content to be rendered if an error occurs
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  const [hasError, setHasError] = useState(false); // State to track if an error has occurred

  useEffect(() => {
    // Handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setHasError(true);
      console.error("Unhandled rejection:", event.reason);
    };

    // Handler for error events
    const handleErrorEvent = (event: ErrorEvent) => {
      setHasError(true);
      console.error("Error event:", event.error);
    };

    // Add event listeners for unhandled promise rejections and error events
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleErrorEvent);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
      window.removeEventListener("error", handleErrorEvent);
    };
  }, []);

  // Render fallback content if an error has occurred; otherwise, render children
  if (hasError) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
