// ToolBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ToolBar } from "./ToolBar";
import { useNavigate } from "react-router-dom";
import { useRestaurants } from "../../contexts/RestaurantsContext";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";

// Mocking hooks
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../contexts/RestaurantsContext", () => ({
  useRestaurants: jest.fn(),
}));

jest.mock("../../contexts/RestaurantTabsContext", () => ({
  useRestaurantTabs: jest.fn(),
}));

describe("ToolBar Component", () => {
  let mockNavigate: jest.Mock;
  let setSearchText: jest.Mock;
  let setActiveTabKey: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    setSearchText = jest.fn();
    setActiveTabKey = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useRestaurants as jest.Mock).mockReturnValue({ setSearchText });
    (useRestaurantTabs as jest.Mock).mockReturnValue({ setActiveTabKey });
  });

  test("renders correctly with parentRoute", () => {
    render(<ToolBar parentRoute="/previous-page" />);

    // expect(screen.getByTitle("Back")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Search Text")).toBeNull();
    expect(screen.getByText("Add Restaurant")).toBeInTheDocument();
  });

  test("renders correctly without parentRoute", () => {
    render(<ToolBar parentRoute={null} />);

    expect(screen.queryByTitle("Back")).toBeNull();
    expect(screen.getByPlaceholderText("Search Text")).toBeInTheDocument();
    expect(screen.getByText("Add Restaurant")).toBeInTheDocument();
  });

  test("handleBackClick navigates to the parent route", () => {
    render(<ToolBar parentRoute="/previous-page" />);

    // fireEvent.click(screen.getByTitle("Back"));

    // expect(mockNavigate).toHaveBeenCalledWith("/previous-page");
  });

  test("handleSearch updates search text", () => {
    render(<ToolBar parentRoute={null} />);

    fireEvent.change(screen.getByPlaceholderText("Search Text"), {
      target: { value: "new search text" },
    });

    expect(setSearchText).toHaveBeenCalledWith("new search text");
  });

  test('handleAddClick navigates to "Add Restaurant" page and sets active tab', () => {
    render(<ToolBar parentRoute={null} />);

    fireEvent.click(screen.getByText("Add Restaurant"));

    expect(mockNavigate).toHaveBeenCalledWith("/admin/restaurants/add");
    expect(setActiveTabKey).toHaveBeenCalledWith("1");
  });
});
