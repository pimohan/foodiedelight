// Import necessary components and icons from Ant Design
import { Button, Flex, Tooltip, FormInstance } from "antd";
import {
  SaveOutlined,
  UndoOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";

// Define props for the ActionButtonGroup component
interface ActionButtonGroupProps {
  form?: FormInstance<any> | null; // Optional form instance for form-related actions
  onSave?: () => void; // Optional callback function for saving
}

// Define the ActionButtonGroup component
export const ActionButtonGroup = ({ form, onSave }: ActionButtonGroupProps) => {
  // Access activeTabKey and setActiveTabKey from the RestaurantTabsContext
  const { activeTabKey, setActiveTabKey } = useRestaurantTabs();

  // Handle the action when the "Previous" button is clicked
  const handlePreviousClick = () => {
    let currentKey: number = parseInt(activeTabKey ? activeTabKey : "1") - 1;

    if (currentKey > 0 && currentKey < 3) {
      setActiveTabKey(currentKey.toString());
    }
  };

  // Handle the action when the "Next" button is clicked
  const handleNextClick = () => {
    const currentKey: number = parseInt(activeTabKey ? activeTabKey : "1") + 1;

    if (currentKey <= 3) {
      setActiveTabKey(currentKey.toString());
    }
  };

  // Render buttons for navigation and form actions
  return (
    <Flex
      className="tab-1-btn-group"
      justify={form ? "space-evenly" : "flex-start"}
    >
      {activeTabKey !== "1" ? (
        <Flex gap="small">
          <Tooltip title="Previous">
            <Button
              icon={<DoubleLeftOutlined />}
              type="link"
              iconPosition="start"
              onClick={handlePreviousClick}
            >
              Previous
            </Button>
          </Tooltip>
        </Flex>
      ) : (
        <div style={{ width: 107 }}></div>
      )}

      {form && (
        <>
          <Flex gap="small">
            <Button
              htmlType="button"
              icon={<UndoOutlined />}
              onClick={() => form?.resetFields()}
            >
              Reset
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              htmlType="button"
              onClick={onSave}
            >
              Save
            </Button>
          </Flex>
          <Flex gap="small">
            <Tooltip title="Next">
              <Button
                icon={<DoubleRightOutlined />}
                type="link"
                iconPosition="end"
                onClick={handleNextClick}
              >
                Next
              </Button>
            </Tooltip>
          </Flex>
        </>
      )}
    </Flex>
  );
};
