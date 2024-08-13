import { createContext, useState, useContext } from "react";

import { BaseProps } from "../interfaces/BaseProps";
import { Restaurant } from "./../interfaces/Restaurant";

// Define the shape of the context object
interface RestaurantTabsContextProps {
  activeTabKey: string | undefined; // Key of the currently active tab
  setActiveTabKey: (value: string) => void; // Function to set the active tab key
  selectedRestaurant: Restaurant | null; // Currently selected restaurant
  setSelectedRestaurant: (restaurant: Restaurant | null) => void; // Function to set the selected restaurant
}

// Create the context object
const RestaurantTabsContext = createContext<RestaurantTabsContextProps>({
  activeTabKey: undefined, // Default active tab key
  setActiveTabKey: () => {}, // Default function
  selectedRestaurant: null, // Default selected restaurant
  setSelectedRestaurant: () => {}, // Default function
});

// Context provider component
export const RestaurantTabsProvider = ({ children }: BaseProps) => {
  // State to manage active tab and selected restaurant
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>("1"); // Default active tab is "1"
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  // Provide context values to child components
  return (
    <RestaurantTabsContext.Provider
      value={{
        activeTabKey,
        setActiveTabKey,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {children}
    </RestaurantTabsContext.Provider>
  );
};

// Custom hook to access context values
export const useRestaurantTabs = () => useContext(RestaurantTabsContext);
