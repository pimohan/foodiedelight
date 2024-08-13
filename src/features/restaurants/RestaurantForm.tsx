import { useEffect, useState } from "react";
import { AutoComplete, Form, Input, Select } from "antd";

import { useCustomNotification } from "../../hooks/Notification";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";
import { formItemLayout } from "../../types/LayoutConstants";
import { getWebsiteExtensions } from "../../utils/FormInputUtil";
import { FormSharedProps } from "../../interfaces/FormSharedProps";
import { useParams } from "react-router-dom";
import { FormMode } from "../../types/Types";
import { ActionButtonGroup } from "./ActionButtonGroup";
import { useRestaurants } from "../../contexts/RestaurantsContext";

const { Option } = Select;

export const RestaurantForm = ({ formMode }: FormSharedProps) => {
  const [form] = Form.useForm(); // Create a form instance
  const { restaurantId } = useParams(); // Get restaurantId from route params
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]); // State for autocomplete options
  const { openNotificationWithIcon, contextHolder } = useCustomNotification(); // Custom notification hook
  const { restaurantService } = useRestaurants();
  const { setSelectedRestaurant } = useRestaurantTabs(); // Context for selected restaurant

  useEffect(() => {
    // Fetch and set form values if editing an existing restaurant
    if (formMode === FormMode.Edit && restaurantId && form) {
      (async () => {
        const result = await restaurantService?.getRestaurantById(restaurantId);

        const flattenedValues = {
          name: result?.data?.name || "",
          description: result?.data?.description || "",
          location: result?.data?.location || "",
          category: result?.data?.category || "",
          phone: result?.data?.contact?.phone || "",
          email: result?.data?.contact?.email || "",
          website: result?.data?.contact?.website || "",
        };

        form.setFieldsValue(flattenedValues);
        result && setSelectedRestaurant(result.data);
        console.log(result?.data);
      })();
    }
  }, [formMode, restaurantId, form, setSelectedRestaurant, restaurantService]);

  const onWebsiteChange = (value: string) => {
    // Update autocomplete options based on website input
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(getWebsiteExtensions(value));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  const handleSaveClick = async () => {
    // Validate and save form data
    form
      .validateFields()
      .then(async (values: any) => {
        let response = null;
        const { email, phone, website, ...newRestaurant } = values;
        const dataToUpdate = {
          ...newRestaurant,
          contact: { phone, email, website },
        };

        console.log("dataToUpdate", dataToUpdate);

        if (formMode === FormMode.Add) {
          response = await restaurantService?.addRestaurant(dataToUpdate);
          setSelectedRestaurant(response?.data);
        } else {
          response = await restaurantService?.udpateRestaurantPartial(
            restaurantId,
            dataToUpdate
          );
        }

        openNotificationWithIcon(
          "success",
          "Success",
          `New Restaurant "${values.name}" added successfully.`
        );
      })
      .catch((errorInfo: any) => {
        console.log("RestaurantFormError", errorInfo);
      });
  };

  return (
    <>
      <div className="tab-content">
        {contextHolder}
        <Form form={form} {...formItemLayout} variant="filled">
          {/* Form fields for restaurant details */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "required" }]}
          >
            <Input placeholder="Name of the restaurant" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "required" }]}
          >
            <Input.TextArea placeholder="About the restaurant" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "required" }]}
          >
            <Input.TextArea rows={1} placeholder="Location of the restaurant" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "required" }]}
          >
            <Select placeholder="Choose Category">
              <Option value="chinese">Chinese</Option>
              <Option value="indian">Indian</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "required" }]}
          >
            <Input placeholder="Phone number" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              { required: true, message: "required" },
            ]}
          >
            <Input placeholder="E-mail address" />
          </Form.Item>

          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: "required" }]}
          >
            <AutoComplete
              options={websiteOptions}
              onChange={onWebsiteChange}
              placeholder="website"
            >
              <Input placeholder="Website URL" />
            </AutoComplete>
          </Form.Item>
        </Form>
      </div>
      <ActionButtonGroup form={form} onSave={handleSaveClick} />
    </>
  );
};
