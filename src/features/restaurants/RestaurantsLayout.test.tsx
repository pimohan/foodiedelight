// RestaurantsLayout.test.tsx
import { render, screen } from "@testing-library/react";
import RestaurantsLayout from "./RestaurantsLayout";

// Mocking context providers and components
jest.mock("../../contexts/RestaurantTabsContext", () => ({
  RestaurantTabsProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("../../contexts/RestaurantsContext", () => ({
  RestaurantsProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("../../ui/PageHeader", () => ({
  PageHeader: () => <div>PageHeader</div>,
}));

jest.mock("react-router-dom", () => ({
  Outlet: () => <div>Outlet</div>,
}));

describe("RestaurantsLayout Component", () => {
  test("renders PageHeader and Outlet", () => {
    render(<RestaurantsLayout />);

    // Check if PageHeader is rendered
    expect(screen.getByText("PageHeader")).toBeInTheDocument();

    // Check if Outlet is rendered
    expect(screen.getByText("Outlet")).toBeInTheDocument();
  });
});
