import { Outlet } from "react-router-dom";

import { RestaurantTabsProvider } from "../../contexts/RestaurantTabsContext";
import { PageHeader } from "../../ui/PageHeader";
import { RestaurantsProvider } from "../../contexts/RestaurantsContext";

const RestaurantsLayout = () => {
  return (
    // Providers for context management
    <RestaurantTabsProvider>
      <RestaurantsProvider>
        <div>
          {/* Page header for navigation and title */}
          <PageHeader />

          {/* Main content area */}
          <main>
            {/* Renders nested routes */}
            <Outlet />
          </main>
        </div>
      </RestaurantsProvider>
    </RestaurantTabsProvider>
  );
};

export default RestaurantsLayout;
