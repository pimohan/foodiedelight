import { Tabs } from "antd";
import {
  FieldTimeOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";

import { RestaurantForm } from "./RestaurantForm";
import { OperatingHours } from "./OperatingHours";
import { MenuList } from "./MenuList";
import { FormSharedProps } from "../../interfaces/FormSharedProps";
import { ToolBar } from "./ToolBar";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";

const RestaurantTabs = ({ formMode }: FormSharedProps) => {
  // Get the current active tab key and the function to set it
  const { activeTabKey, setActiveTabKey } = useRestaurantTabs();

  // Define the tabs and their content
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Restaurant Info",
      children: <RestaurantForm formMode={formMode} />,
      icon: <ProductOutlined />,
    },
    {
      key: "2",
      label: "Operating Hours",
      children: <OperatingHours formMode={formMode} />,
      icon: <FieldTimeOutlined />,
    },
    {
      key: "3",
      label: "Menus",
      children: <MenuList formMode={formMode} />,
      icon: <MenuUnfoldOutlined />,
    },
  ];

  // Handle tab change event
  const onChange = (key: string) => {
    console.log(key); // Log the active tab key (for debugging purposes)
    setActiveTabKey(key); // Update the active tab key in context
  };

  return (
    <>
      <header>
        {/* Toolbar component with a link to the restaurant list */}
        <ToolBar parentRoute="/admin/restaurants/list" />
      </header>
      <main>
        <Tabs
          defaultActiveKey={activeTabKey}
          activeKey={activeTabKey}
          items={items}
          onChange={onChange}
        />
      </main>
    </>
  );
};

export default RestaurantTabs;
