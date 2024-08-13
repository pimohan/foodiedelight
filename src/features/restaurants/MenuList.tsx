import { useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { omitNullAndUndefined } from "../../utils/ObjectUtil";
import { FormSharedProps } from "../../interfaces/FormSharedProps";
import { FormMode } from "../../types/Types";
import { useCustomNotification } from "../../hooks/Notification";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";
import { ActionButtonGroup } from "./ActionButtonGroup";
import { useRestaurants } from "../../contexts/RestaurantsContext";

const { Option } = Select;

// Define the MenuList component, which handles the menu form for restaurants
export const MenuList = ({ formMode }: FormSharedProps) => {
  // Initialize the form instance and access necessary contexts and hooks
  const [form] = Form.useForm();
  const { restaurantService } = useRestaurants();
  const { selectedRestaurant } = useRestaurantTabs();
  const { openNotificationWithIcon, contextHolder } = useCustomNotification();

  // Effect to set form values when in edit mode and a restaurant is selected
  useEffect(() => {
    if (formMode === FormMode.Edit && selectedRestaurant?.id && form) {
      form.setFieldsValue({ menu: selectedRestaurant.menu });
    }
  }, [formMode, selectedRestaurant, form]);

  // Handle the deletion of a menu item
  const handleMenuDelete = () => {
    form
      .validateFields()
      .then(async (values: any) => {
        await restaurantService?.udpateRestaurantPartial(
          selectedRestaurant?.id,
          omitNullAndUndefined(values)
        );

        openNotificationWithIcon(
          "success",
          "Success",
          `Menu Item removed for the restaurant "${selectedRestaurant?.name}" successfully.`
        );
      })
      .catch((errorInfo: any) => {
        console.log("MenuError", errorInfo);
      });
  };

  // Handle updating the menu items, including adding new ones
  const handleMenuUpdate = (add: any) => {
    const formValues = form.getFieldsValue();
    const isFirstMenuItem = formValues.menu.length === 0;

    if (isFirstMenuItem) {
      add();
    } else {
      form
        .validateFields()
        .then(async (values: any) => {
          await restaurantService?.udpateRestaurantPartial(
            selectedRestaurant?.id,
            values
          );
          openNotificationWithIcon(
            "success",
            "Success",
            `Menu Items updated for the restaurant "${selectedRestaurant?.name}" successfully.`
          );
          add();
        })
        .catch((errorInfo: any) => {
          console.log("MenuError", errorInfo);
        });
    }
  };

  return (
    <>
      {contextHolder}
      {/* Render action buttons for the menu */}
      <ActionButtonGroup />
      {/* Render the form for menu items */}
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="menuListForm"
        autoComplete="off"
        initialValues={{ menu: [{}] }}
        data-testid="menu-list-form"
      >
        <Form.List name="menu">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {/* Render each menu item card */}
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Menu Item ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => {
                        remove(field.name);
                        handleMenuDelete();
                      }}
                      data-testid={`delete-popconfirm-${field.name}`}
                    >
                      <CloseOutlined
                        data-testid={`delete-icon-${field.name}`}
                      />
                    </Popconfirm>
                  }
                  data-testid={`menu-item-card-${field.name}`}
                >
                  {/* Form item for menu name */}
                  <Form.Item
                    label="Name"
                    name={[field.name, "name"]}
                    rules={[{ required: true, message: "required" }]}
                    data-testid={`menu-item-name-${field.name}`}
                  >
                    <Input placeholder="Name of the menu" />
                  </Form.Item>
                  {/* Form item for menu description */}
                  <Form.Item
                    label="Description"
                    name={[field.name, "description"]}
                    rules={[{ required: true, message: "required" }]}
                    data-testid={`menu-item-description-${field.name}`}
                  >
                    <Input.TextArea placeholder="About the menu" />
                  </Form.Item>
                  {/* Form item for menu price */}
                  <Form.Item
                    label="Price"
                    name={[field.name, "price"]}
                    rules={[
                      { required: true, message: "required" },
                      {
                        type: "number",
                        min: 1,
                        message: "Price must be at least 1",
                      },
                    ]}
                    data-testid={`menu-item-price-${field.name}`}
                  >
                    <InputNumber />
                  </Form.Item>
                  {/* Form item for menu category */}
                  <Form.Item
                    label="Category"
                    name={[field.name, "category"]}
                    rules={[{ required: true, message: "required" }]}
                    data-testid={`menu-item-category-${field.name}`}
                  >
                    <Select placeholder="Choose Category">
                      <Option value="chinese">Chinese</Option>
                      <Option value="indian">Indian</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Card>
              ))}

              {/* Button to save changes and add a new menu item */}
              <Button
                type="dashed"
                onClick={() => handleMenuUpdate(add)}
                block
                data-testid="add-menu-item-button"
              >
                + Save & Add Menu Item
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
    </>
  );
};
