import { createContext, useState, useContext } from "react";
import { BaseProps } from "../interfaces/BaseProps";
import { Restaurant } from "../interfaces/Restaurant";
import { RestaurantService } from "../services/RestaurantService";

// Define the shape of the context object
interface RestaurantsContextProps {
  searchText: string | undefined; // Search query
  setSearchText: (value: string) => void; // Function to update search query
  filteredRestaurants: Restaurant[]; // Array of filtered restaurants
  setFilteredRestaurants: (value: Restaurant[]) => void; // Function to update filtered restaurants
  restaurantService: RestaurantService | null;
  setRestaurantService: (value: RestaurantService) => void;
  reload: boolean;
  setReload: (value: boolean) => void;
}

// Create the context object
const RestaurantsContext = createContext<RestaurantsContextProps>({
  searchText: "", // Default search query
  setSearchText: () => {}, // Default function
  filteredRestaurants: [], // Default filtered restaurants
  setFilteredRestaurants: () => {}, // Default function
  restaurantService: null,
  setRestaurantService: (value: RestaurantService) => {},
  reload: false,
  setReload: (value: boolean) => {},
});

// Context provider component
export const RestaurantsProvider = ({ children }: BaseProps) => {
  // State to manage search query and filtered restaurants
  const [reload, setReload] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [restaurantService, setRestaurantService] = useState<RestaurantService>(
    new RestaurantService()
  );
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );

  // Provide context values to child components
  return (
    <RestaurantsContext.Provider
      value={{
        reload,
        setReload,
        searchText,
        setSearchText,
        filteredRestaurants,
        setFilteredRestaurants,
        restaurantService,
        setRestaurantService,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

// Custom hook to access context values
export const useRestaurants = () => useContext(RestaurantsContext);
