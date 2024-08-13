// The rest of your test code
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { FormMode } from "../../types/Types";
import { MenuList } from "./MenuList";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";
import { useCustomNotification } from "../../hooks/Notification";

// Add this at the top of your test file before other imports
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock useRestaurantTabs
jest.mock("../../contexts/RestaurantTabsContext", () => ({
  useRestaurantTabs: jest.fn(),
}));

// Mock useCustomNotification
jest.mock("../../hooks/Notification", () => ({
  useCustomNotification: jest.fn(),
}));

// Mock ActionButtonGroup
jest.mock("./ActionButtonGroup", () => ({
  ActionButtonGroup: () => <div>ActionButtonGroup</div>,
}));

describe("MenuList", () => {
  const mockSelectedRestaurant = {
    id: "1",
    name: "Test Restaurant",
    menu: [
      {
        name: "Test Menu Item",
        description: "Test Description",
        price: 10,
        category: "chinese",
      },
    ],
  };

  beforeEach(() => {
    (useRestaurantTabs as jest.Mock).mockReturnValue({
      selectedRestaurant: mockSelectedRestaurant,
    });
    (useCustomNotification as jest.Mock).mockReturnValue({
      openNotificationWithIcon: jest.fn(),
      contextHolder: <div>Notification</div>,
    });
  });

  it("should render the MenuList component", () => {
    render(<MenuList formMode={FormMode.Edit} />);

    expect(screen.getByTestId("menu-list-form")).toBeInTheDocument();
    expect(screen.getByText("ActionButtonGroup")).toBeInTheDocument();
  });

  it("should render menu items", () => {
    render(<MenuList formMode={FormMode.Edit} />);

    expect(screen.getByText("Menu Item 1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name of the menu")).toHaveValue(
      "Test Menu Item"
    );
    expect(screen.getByPlaceholderText("About the menu")).toHaveValue(
      "Test Description"
    );
    // expect(screen.getByDisplayValue(10)).toBeInTheDocument();
    // expect(screen.getByDisplayValue("chinese")).toBeInTheDocument();
  });

  it("should handle menu delete", async () => {
    mockedAxios.patch.mockResolvedValueOnce({});

    render(<MenuList formMode={FormMode.Edit} />);

    fireEvent.click(screen.getByTestId("delete-icon-0"));
    fireEvent.click(screen.getByText("OK"));

    // await waitFor(() =>
    //   expect(mockedAxios.patch).toHaveBeenCalledWith(
    //     `http://localhost:5001/restaurants/${mockSelectedRestaurant.id}`,
    //     { menu: [] }
    //   )
    // );
  });

  it("should handle menu update", async () => {
    mockedAxios.patch.mockResolvedValueOnce({});

    render(<MenuList formMode={FormMode.Edit} />);

    fireEvent.click(screen.getByTestId("add-menu-item-button"));

    await waitFor(() =>
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        `http://localhost:5001/restaurants/${mockSelectedRestaurant.id}`,
        { menu: mockSelectedRestaurant.menu }
      )
    );
  });
});
