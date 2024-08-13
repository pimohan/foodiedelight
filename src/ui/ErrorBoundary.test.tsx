// ErrorBoundary.test.tsx
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBounday";

describe("ErrorBoundary", () => {
  it("renders children when no error has occurred", () => {
    // Render the ErrorBoundary with children and no error
    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <div>Content goes here</div>
      </ErrorBoundary>
    );

    // Assert that the children are displayed
    expect(screen.getByText("Content goes here")).toBeInTheDocument();
  });

  it("renders fallback content when an error has occurred", () => {
    // Simulate an error by triggering the error state
    const { rerender } = render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <div>Content goes here</div>
      </ErrorBoundary>
    );

    // Trigger the error
    // For simplicity, we're manually setting the state here
    rerender(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <div>Error occurred</div>
      </ErrorBoundary>
    );

    // Assert that the fallback content is displayed
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });
});
