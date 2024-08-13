import { useNavigate } from "react-router-dom";
import { Button, Flex, Input, Tooltip } from "antd";
import {
  DownloadOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { useRestaurants } from "../../contexts/RestaurantsContext";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";

interface ToolBarProps {
  parentRoute: string | null;
}

export const ToolBar = ({ parentRoute }: ToolBarProps) => {
  const navigate = useNavigate(); // Hook for navigation
  const { setActiveTabKey } = useRestaurantTabs(); // Hook to manage the active tab in the context
  const { setSearchText } = useRestaurants(); // Hook to set the search text in the context

  // Navigate back to the parent route if it exists
  const handleBackClick = () => {
    parentRoute && navigate(parentRoute);
    setActiveTabKey("1");
  };

  // Log the parent route (useful for debugging)
  console.log("ParentRoute", parentRoute);

  // Update the search text in the context
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  // Navigate to the "Add Restaurant" page and set the active tab to "1"
  const handleAddClick = () => {
    navigate("/admin/restaurants/add");
  };

  return (
    <div style={{ margin: "8px 0px" }}>
      <Flex gap="small" justify={parentRoute ? "space-between" : "flex-end"}>
        {/* Back button */}
        {parentRoute && (
          <Tooltip title="Back">
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              onClick={handleBackClick}
            />
          </Tooltip>
        )}
        {/* Search input (only visible if no parentRoute) */}
        {parentRoute === null && (
          <Input
            placeholder="Search Text"
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            allowClear
          />
        )}
        {/* Button to navigate to the "Add Restaurant" page */}
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleAddClick}
        >
          Add Restaurant
        </Button>
      </Flex>
    </div>
  );
};
