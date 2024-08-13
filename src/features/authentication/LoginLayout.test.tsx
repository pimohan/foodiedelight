import { render, screen } from "@testing-library/react";
import { act } from "react";
import { LoginLayout } from "./LoginLayout"; // Adjust the import path as necessary

describe("LoginLayout", () => {
  it("should render the child component", () => {
    const ChildComponent = () => <div>Child Content</div>;

    render(
      <LoginLayout>
        <ChildComponent />
      </LoginLayout>
    );

    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});
