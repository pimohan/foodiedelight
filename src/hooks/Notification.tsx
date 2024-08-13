import { notification } from "antd";
import { useCallback } from "react";

type NotificationType = "success" | "info" | "warning" | "error";

/**
 * Custom hook for handling notifications with Ant Design.
 *
 * @returns An object containing:
 * - `openNotificationWithIcon`: Function to open a notification with a specified type, message, and description.
 * - `contextHolder`: React element that holds the notification context.
 */
export const useCustomNotification = () => {
  // Destructure the notification API and context holder from Ant Design's useNotification hook
  const [api, contextHolder] = notification.useNotification();

  // Memoized callback function to open a notification with a specified type, message, and description
  const openNotificationWithIcon = useCallback(
    (type: NotificationType, message: string, description: string) => {
      api[type]({
        message, // Title of the notification
        description, // Detailed message or content of the notification
      });
    },
    [api] // Dependencies array: only re-create the callback if 'api' changes
  );

  // Return the notification function and context holder for use in components
  return { openNotificationWithIcon, contextHolder };
};
