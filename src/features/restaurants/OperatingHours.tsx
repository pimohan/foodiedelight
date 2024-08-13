// Import necessary components, hooks, and utilities
import { Flex, Form, Tag, TimePicker } from "antd";

import { useCustomNotification } from "../../hooks/Notification";
import {
  DEFAULT_TIME,
  DEFAULT_TIME_FRIDAY,
  DEFAULT_TIME_WEEKEND,
  TIME_FORMAT,
} from "../../types/Constants";
import { formItemLayout } from "../../types/LayoutConstants";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";
import {
  convertTimeRangeStringToTime,
  formattedTimeRange,
} from "../../utils/TimeFormatUtil";
import { FormSharedProps } from "../../interfaces/FormSharedProps";
import { useEffect } from "react";
import { FormMode } from "../../types/Types";
import { ActionButtonGroup } from "./ActionButtonGroup";
import { useRestaurants } from "../../contexts/RestaurantsContext";
import { className } from "./../../../node_modules/react-scripts/node_modules/@sinonjs/commons/types/index.d";

// Define the OperatingHours component for managing restaurant operating hours
export const OperatingHours = ({ formMode }: FormSharedProps) => {
  // Initialize the form instance and access custom notification and restaurant context
  const [form] = Form.useForm();
  const { openNotificationWithIcon, contextHolder } = useCustomNotification();
  const { restaurantService } = useRestaurants();
  const { selectedRestaurant } = useRestaurantTabs();

  // Effect to set form values based on the current mode (Edit or Add)
  useEffect(() => {
    if (formMode === FormMode.Edit && selectedRestaurant?.id && form) {
      const flattenedValues = {
        monday:
          convertTimeRangeStringToTime(
            selectedRestaurant.operating_hours.monday
          ) || "",
        tuesday:
          convertTimeRangeStringToTime(
            selectedRestaurant.operating_hours.tuesday
          ) || "",
        wednesday:
          convertTimeRangeStringToTime(
            selectedRestaurant.operating_hours.wednesday
          ) || "",
        thursday:
          convertTimeRangeStringToTime(
            selectedRestaurant.operating_hours.thursday
          ) || "",
        friday:
          convertTimeRangeStringToTime(
            selectedRestaurant.operating_hours.friday
          ) || "",
        saturday:
          convertTimeRangeStringToTime(
            selectedRestaurant.operating_hours.saturday
          ) || "",
        sunday:
          convertTimeRangeStringToTime(
            selectedRestaurant.operating_hours.sunday
          ) || "",
      };

      form.setFieldsValue(flattenedValues);
    } else if (formMode === FormMode.Add && form) {
      form.setFieldsValue({
        monday: DEFAULT_TIME,
        tuesday: DEFAULT_TIME,
        wednesday: DEFAULT_TIME,
        thursday: DEFAULT_TIME,
        friday: DEFAULT_TIME_FRIDAY,
        saturday: DEFAULT_TIME_WEEKEND,
        sunday: DEFAULT_TIME_WEEKEND,
      });
    }
  }, [formMode, selectedRestaurant, form]);

  // Handle saving the operating hours
  const handleSaveOperatingHours = async () => {
    form
      .validateFields()
      .then(async (values: any) => {
        const operatingHours = {
          operating_hours: {
            monday: formattedTimeRange(values.monday),
            tuesday: formattedTimeRange(values.tuesday),
            wednesday: formattedTimeRange(values.wednesday),
            thursday: formattedTimeRange(values.thursday),
            friday: formattedTimeRange(values.friday),
            saturday: formattedTimeRange(values.saturday),
            sunday: formattedTimeRange(values.sunday),
          },
        };

        await restaurantService?.udpateRestaurantPartial(
          selectedRestaurant?.id,
          operatingHours
        );

        openNotificationWithIcon(
          "success",
          "Success",
          `Operating Hours updated for the restaurant "${selectedRestaurant?.name}" successfully.`
        );
      })
      .catch((errorInfo: any) => {
        console.log("OperatingHoursError", errorInfo);
      });
  };

  return (
    <>
      <Flex className="tab-content" justify="center" align="center">
        {contextHolder}
        {/* Render the form for managing operating hours */}
        <Form
          form={form}
          {...formItemLayout}
          variant="filled"
          className="operating-form"
          style={{ minWidth: 500 }}
        >
          {/* Form item for Monday's operating hours */}
          <Form.Item
            label={<Tag color="blue">Monday</Tag>}
            name="monday"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "required" }]}
          >
            <TimePicker.RangePicker
              size="small"
              use12Hours
              format={TIME_FORMAT}
            />
          </Form.Item>
          {/* Form item for Tuesday's operating hours */}
          <Form.Item
            label={<Tag color="purple">Tuesday</Tag>}
            name="tuesday"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "required" }]}
          >
            <TimePicker.RangePicker
              size="small"
              use12Hours
              format={TIME_FORMAT}
            />
          </Form.Item>

          {/* Form item for Wednesday's operating hours */}
          <Form.Item
            label={<Tag color="volcano">Wednesday</Tag>}
            name="wednesday"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "required" }]}
          >
            <TimePicker.RangePicker
              size="small"
              use12Hours
              format={TIME_FORMAT}
            />
          </Form.Item>
          {/* Form item for Thursday's operating hours */}
          <Form.Item
            label={<Tag color="geekblue">Thursday</Tag>}
            name="thursday"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "required" }]}
          >
            <TimePicker.RangePicker
              size="small"
              use12Hours
              format={TIME_FORMAT}
            />
          </Form.Item>
          {/* Form item for Friday's operating hours */}
          <Form.Item
            label={<Tag color="magenta">Friday</Tag>}
            name="friday"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "required" }]}
          >
            <TimePicker.RangePicker
              size="small"
              use12Hours
              format={TIME_FORMAT}
            />
          </Form.Item>
          {/* Form item for Saturday's operating hours */}
          <Form.Item
            label={<Tag color="cyan">Saturday</Tag>}
            name="saturday"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "required" }]}
          >
            <TimePicker.RangePicker
              size="small"
              use12Hours
              format={TIME_FORMAT}
            />
          </Form.Item>
          {/* Form item for Sunday's operating hours */}
          <Form.Item
            label={<Tag color="green">Sunday</Tag>}
            name="sunday"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "required" }]}
          >
            <TimePicker.RangePicker
              size="small"
              use12Hours
              format={TIME_FORMAT}
            />
          </Form.Item>
        </Form>
      </Flex>
      {/* Render action buttons for saving and other actions */}
      <ActionButtonGroup form={form} onSave={handleSaveOperatingHours} />
    </>
  );
};
