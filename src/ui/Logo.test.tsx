// Logo.test.tsx
import { render, screen } from "@testing-library/react"; // Import React Testing Library functions
import { Logo } from "./Logo"; // Adjust the path as needed
import { LogoSize } from "../types/Types"; // Adjust the path as needed

describe("Logo", () => {
  it("should render the logo image correctly", () => {
    render(<Logo size={LogoSize.Small} />); // Render Logo component with a size prop

    // Assert that the logo image is rendered
    const imgElement = screen.getByAltText("Logo");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "/logofd.jpg"); // Check image source
    expect(imgElement).toHaveAttribute("title", "Foodie Delight"); // Check image title
  });

  it("should render the header when size is LogoSize.Medium", () => {
    render(<Logo size={LogoSize.Medium} />); // Render Logo component with medium size

    // Assert that the header is rendered
    const headerElement = screen.getByText("Log in to Your Account");
    expect(headerElement).toBeInTheDocument();
  });

  it("should not render the header when size is not LogoSize.Medium", () => {
    render(<Logo size={LogoSize.Small} />); // Render Logo component with small size

    // Assert that the header is not rendered
    const headerElement = screen.queryByText("Log in to Your Account");
    expect(headerElement).not.toBeInTheDocument();
  });
});
