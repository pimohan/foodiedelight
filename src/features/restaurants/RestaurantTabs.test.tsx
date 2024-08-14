// RestaurantTabs.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import RestaurantTabs from "./RestaurantTabs";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";
import { FormMode } from "../../types/Types";

// Mocking hooks and components
jest.mock("../../contexts/RestaurantTabsContext", () => ({
  useRestaurantTabs: jest.fn(),
}));

jest.mock("./ToolBar", () => ({
  ToolBar: jest.fn(() => <div>ToolBar</div>),
}));

jest.mock("./RestaurantForm", () => ({
  RestaurantForm: jest.fn(() => <div>RestaurantForm</div>),
}));

jest.mock("./OperatingHours", () => ({
  OperatingHours: jest.fn(() => <div>OperatingHours</div>),
}));

jest.mock("./MenuList", () => ({
  MenuList: jest.fn(() => <div>MenuList</div>),
}));

describe("RestaurantTabs Component", () => {
  let setActiveTabKey: jest.Mock;

  beforeEach(() => {
    setActiveTabKey = jest.fn();
    (useRestaurantTabs as jest.Mock).mockReturnValue({
      activeTabKey: "1",
      setActiveTabKey,
    });
  });

  test("renders correctly and displays Toolbar and Tabs", () => {
    render(<RestaurantTabs formMode={FormMode.Add} />);
  });

  test("handles tab change correctly", () => {
    render(<RestaurantTabs formMode={FormMode.Edit} />);

    // Simulate a tab change
    fireEvent.click(screen.getByText("Operating Hours"));

    // Check if setActiveTabKey was called with the correct key
    expect(setActiveTabKey).toHaveBeenCalledWith("2");
  });
});
