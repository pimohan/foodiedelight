import { render, screen, fireEvent } from "@testing-library/react";
import {
  RestaurantTabsProvider,
  useRestaurantTabs,
} from "./RestaurantTabsContext";

describe("RestaurantTabsContext", () => {
  // Define the test component inside the test file
  const TestComponent = () => {
    const {
      activeTabKey,
      setActiveTabKey,
      selectedRestaurant,
      setSelectedRestaurant,
    } = useRestaurantTabs();

    return (
      <div>
        <span data-testid="context-activeTabKey">{activeTabKey}</span>
        <span data-testid="context-selectedRestaurant-id">
          {selectedRestaurant?.id}
        </span>
        <span data-testid="context-selectedRestaurant-name">
          {selectedRestaurant?.name}
        </span>
        <span data-testid="context-selectedRestaurant-contact-description">
          {selectedRestaurant?.description}
        </span>
        <span data-testid="context-selectedRestaurant-contact-description">
          {selectedRestaurant?.description}
        </span>
        <span data-testid="context-selectedRestaurant-category">
          {selectedRestaurant?.category}
        </span>
        <span data-testid="context-selectedRestaurant-contact-phone">
          {selectedRestaurant?.contact?.phone}
        </span>
        <span data-testid="context-selectedRestaurant-contact-email">
          {selectedRestaurant?.contact?.email}
        </span>
        <span data-testid="context-selectedRestaurant-contact-website">
          {selectedRestaurant?.contact?.website}
        </span>

        <button
          onClick={() => {
            setActiveTabKey("2");
            setSelectedRestaurant({
              id: "1",
              name: "Test Name",
              category: "Indian",
              contact: {
                phone: "1234567890",
                email: "test@test.com",
                website: "https://www.test.com",
              },
              description: "Test Name",
              location: "Chennai",
              menu: [
                {
                  name: "Menu 1",
                  price: 100,
                  category: "Indian",
                  description: "Menu 1",
                },
              ],
              operating_hours: {
                monday: "09:00 AM - 09:00 PM",
                tuesday: "09:00 AM - 09:00 PM",
                wednesday: "09:00 AM - 09:00 PM",
                thursday: "09:00 AM - 09:00 PM",
                friday: "09:00 AM - 09:00 PM",
                saturday: "09:00 AM - 09:00 PM",
                sunday: "09:00 AM - 09:00 PM",
              },
            });
          }}
          data-testid="context-button"
        >
          Change Value
        </button>
      </div>
    );
  };

  it("provides default value", () => {
    render(
      <RestaurantTabsProvider>
        <TestComponent />
      </RestaurantTabsProvider>
    );

    expect(screen.getByTestId("context-activeTabKey")).toHaveTextContent("1");
  });

  it("updates value on button click", () => {
    render(
      <RestaurantTabsProvider>
        <TestComponent />
      </RestaurantTabsProvider>
    );

    fireEvent.click(screen.getByTestId("context-button"));

    expect(screen.getByTestId("context-activeTabKey")).toHaveTextContent("2");
  });
});
