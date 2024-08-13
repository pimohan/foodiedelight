import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FormMode } from "../../types/Types";
import { OperatingHours } from "./OperatingHours";
import { useCustomNotification } from "../../hooks/Notification";
import { useRestaurants } from "../../contexts/RestaurantsContext";
import { useRestaurantTabs } from "../../contexts/RestaurantTabsContext";
import "@testing-library/jest-dom/extend-expect";

// Mock Ant Design components
jest.mock("antd", () => ({
  ...jest.requireActual("antd"),
  Form: {
    ...jest.requireActual("antd").Form,
    useForm: jest.fn(() => [jest.fn(), {}]),
  },
  TimePicker: {
    RangePicker: jest.fn(() => <div>TimePicker.RangePicker</div>),
  },
  Tag: jest.fn(({ children }) => <div>{children}</div>),
}));

// Mock custom hooks
jest.mock("../../hooks/Notification", () => ({
  useCustomNotification: jest.fn(),
}));

jest.mock("../../contexts/RestaurantsContext", () => ({
  useRestaurants: jest.fn(),
}));

jest.mock("../../contexts/RestaurantTabsContext", () => ({
  useRestaurantTabs: jest.fn(),
}));

describe("OperatingHours", () => {
  const mockForm = {
    setFieldsValue: jest.fn(),
    validateFields: jest.fn(),
  };

  const mockNotification = {
    openNotificationWithIcon: jest.fn(),
    contextHolder: <div>NotificationContextHolder</div>,
  };

  const mockRestaurantService = {
    udpateRestaurantPartial: jest.fn(),
  };

  const mockSelectedRestaurant = {
    id: "1",
    name: "Test Restaurant",
    operating_hours: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "10:00-18:00",
      sunday: "10:00-18:00",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCustomNotification as jest.Mock).mockReturnValue(mockNotification);
    (useRestaurants as jest.Mock).mockReturnValue({
      restaurantService: mockRestaurantService,
    });
    (useRestaurantTabs as jest.Mock).mockReturnValue({
      selectedRestaurant: mockSelectedRestaurant,
    });
    (jest.requireActual("antd").Form.useForm as jest.Mock).mockReturnValue([
      mockForm,
      {},
    ]);
  });

  test("renders OperatingHours component in Add mode", () => {
    render(<OperatingHours formMode={FormMode.Add} />);

    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getByText("Wednesday")).toBeInTheDocument();
    expect(screen.getByText("Thursday")).toBeInTheDocument();
    expect(screen.getByText("Friday")).toBeInTheDocument();
    expect(screen.getByText("Saturday")).toBeInTheDocument();
    expect(screen.getByText("Sunday")).toBeInTheDocument();
  });

  test("renders OperatingHours component in Edit mode and sets form values", () => {
    render(<OperatingHours formMode={FormMode.Edit} />);

    expect(mockForm.setFieldsValue).toHaveBeenCalledWith({
      monday: expect.anything(),
      tuesday: expect.anything(),
      wednesday: expect.anything(),
      thursday: expect.anything(),
      friday: expect.anything(),
      saturday: expect.anything(),
      sunday: expect.anything(),
    });
  });

  test("handles saving operating hours", async () => {
    mockForm.validateFields.mockResolvedValue({
      monday: ["09:00", "17:00"],
      tuesday: ["09:00", "17:00"],
      wednesday: ["09:00", "17:00"],
      thursday: ["09:00", "17:00"],
      friday: ["09:00", "17:00"],
      saturday: ["10:00", "18:00"],
      sunday: ["10:00", "18:00"],
    });

    render(<OperatingHours formMode={FormMode.Edit} />);

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        mockRestaurantService.udpateRestaurantPartial
      ).toHaveBeenCalledWith("1", {
        operating_hours: {
          monday: "09:00-17:00",
          tuesday: "09:00-17:00",
          wednesday: "09:00-17:00",
          thursday: "09:00-17:00",
          friday: "09:00-17:00",
          saturday: "10:00-18:00",
          sunday: "10:00-18:00",
        },
      });
      expect(mockNotification.openNotificationWithIcon).toHaveBeenCalledWith(
        "success",
        "Success",
        'Operating Hours updated for the restaurant "Test Restaurant" successfully.'
      );
    });
  });

  test("handles validation errors when saving operating hours", async () => {
    mockForm.validateFields.mockRejectedValue(new Error("Validation Error"));

    render(<OperatingHours formMode={FormMode.Edit} />);

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(
        mockRestaurantService.udpateRestaurantPartial
      ).not.toHaveBeenCalled();
      expect(mockNotification.openNotificationWithIcon).not.toHaveBeenCalled();
    });
  });
});
