import React from "react";
import { renderHook } from "@testing-library/react";
import { useCustomNotification } from "./Notification"; // Replace with your import path
import { notification } from "antd"; // Import antd

jest.mock("antd", () => ({
  notification: {
    useNotification: jest.fn(),
  },
}));

describe("useCustomNotification", () => {
  it("should call the notification API with correct parameters", () => {
    const mockNotificationApi = {
      success: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
      error: jest.fn(),
    };
    const mockUseNotification = jest
      .fn()
      .mockReturnValue([mockNotificationApi, null]);
    (
      notification as jest.Mocked<typeof import("antd").notification>
    ).useNotification = mockUseNotification;

    const { result } = renderHook(() => useCustomNotification());
    const { openNotificationWithIcon } = result.current;

    // Test different notification types
    openNotificationWithIcon(
      "success",
      "Success message",
      "Success description"
    );
    openNotificationWithIcon("info", "Info message", "Info description");
    openNotificationWithIcon(
      "warning",
      "Warning message",
      "Warning description"
    );
    openNotificationWithIcon("error", "Error message", "Error description");

    // Assertions
    expect(mockNotificationApi.success).toHaveBeenCalledWith({
      message: "Success message",
      description: "Success description",
    });
    expect(mockNotificationApi.info).toHaveBeenCalledWith({
      message: "Info message",
      description: "Info description",
    });
    expect(mockNotificationApi.warning).toHaveBeenCalledWith({
      message: "Warning message",
      description: "Warning description",
    });
    expect(mockNotificationApi.error).toHaveBeenCalledWith({
      message: "Error message",
      description: "Error description",
    });
  });
});
