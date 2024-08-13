import { render, screen, fireEvent } from "@testing-library/react";
import { RestaurantsProvider, useRestaurants } from "./RestaurantsContext";
import { RestaurantService } from "../services/RestaurantService";

describe("RestaurantsContext", () => {
  // Define the test component inside the test file
  const TestComponent = () => {
    const {
      searchText,
      setSearchText,
      filteredRestaurants,
      setFilteredRestaurants,
      restaurantService,
      setRestaurantService,
      reload,
      setReload,
    } = useRestaurants();

    return (
      <div>
        <span data-testid="search-text">{searchText}</span>
        <button
          onClick={() => setSearchText("new search text")}
          data-testid="set-search-text"
        >
          Set Search Text
        </button>

        <span data-testid="reload">{reload.toString()}</span>
        <button onClick={() => setReload(true)} data-testid="set-reload">
          Set Reload
        </button>

        <span data-testid="filtered-restaurants">
          {filteredRestaurants.length}
        </span>
        <button
          onClick={() =>
            setFilteredRestaurants([
              {
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
              },
            ])
          }
          data-testid="set-filtered-restaurants"
        >
          Set Filtered Restaurants
        </button>

        <span data-testid="restaurant-service">
          {restaurantService ? "service exists" : "no service"}
        </span>
        <button
          onClick={() => setRestaurantService(new RestaurantService())}
          data-testid="set-restaurant-service"
        >
          Set Restaurant Service
        </button>
      </div>
    );
  };

  test("provides default values", () => {
    render(
      <RestaurantsProvider>
        <TestComponent />
      </RestaurantsProvider>
    );

    expect(screen.getByTestId("search-text")).toHaveTextContent("");
    expect(screen.getByTestId("reload")).toHaveTextContent("false");
    expect(screen.getByTestId("filtered-restaurants")).toHaveTextContent("0");
    expect(screen.getByTestId("restaurant-service")).toHaveTextContent(
      "service exists"
    );
  });

  test("updates context values", () => {
    render(
      <RestaurantsProvider>
        <TestComponent />
      </RestaurantsProvider>
    );

    fireEvent.click(screen.getByTestId("set-search-text"));
    expect(screen.getByTestId("search-text")).toHaveTextContent(
      "new search text"
    );

    fireEvent.click(screen.getByTestId("set-reload"));
    expect(screen.getByTestId("reload")).toHaveTextContent("true");

    fireEvent.click(screen.getByTestId("set-filtered-restaurants"));
    expect(screen.getByTestId("filtered-restaurants")).toHaveTextContent("1");

    fireEvent.click(screen.getByTestId("set-restaurant-service"));
    expect(screen.getByTestId("restaurant-service")).toHaveTextContent(
      "service exists"
    );
  });
});
