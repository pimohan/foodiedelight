// PageHeader.test.tsx
import { render, screen } from "@testing-library/react"; // Import React Testing Library functions
import { PageHeader } from "./PageHeader"; // Adjust the path as needed
import { useLocation, useParams } from "react-router-dom";
import { removeElement } from "../utils/ArrayUtil";

// Mock the necessary imports
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("../utils/ArrayUtils", () => ({
  removeElement: jest.fn(),
}));

describe("PageHeader", () => {
  it("should render the correct title", () => {
    // Mock the return values of useLocation and useParams
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/restaurants/123/details", // Simulated pathname
    });
    (useParams as jest.Mock).mockReturnValue({
      restaurantId: "123", // Simulated restaurantId
    });

    // Mock the removeElement function to return the expected result
    (removeElement as jest.Mock).mockReturnValue(["restaurants", "details"]);

    // Render the PageHeader component
    render(<PageHeader />);

    // Assert that the title is correctly rendered
    expect(screen.getByText("restaurants - details")).toBeInTheDocument();
  });
});
