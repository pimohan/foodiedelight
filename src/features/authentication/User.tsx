// Import layout component from Ant Design
import { Flex, Tag, Dropdown, Popconfirm } from "antd";
import type { MenuProps } from "antd";

// Import authentication context hook
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCanLogout } from "../../hooks/CanLogout";

// Define the UserInfo component
export const User = () => {
  const navigate = useNavigate(); // Hook for navigation
  // Access the username from the authentication context
  const { username } = useAuth();
  const canLogout = useCanLogout();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: !canLogout ? (
        <Popconfirm
          placement="bottom"
          title="Are you sure to logout ?"
          description="Logout"
          okText="Yes"
          cancelText="No"
          onConfirm={() => navigate("/login")}
        >
          Logout
        </Popconfirm>
      ) : (
        "Logout"
      ),
      onClick: () => canLogout && navigate("/login"),
    },
  ];

  return (
    // Center-align and style the container
    <Flex
      justify="center"
      align="center"
      gap={"small"}
      style={{ height: "65px" }}
    >
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <img
          src={"/default-user.jpg"}
          alt="User"
          style={{ width: 30, height: 30 }}
        />
      </Dropdown>
      <span style={{ marginRight: 25 }}>
        <Tag color="blue">{username}</Tag>
      </span>
    </Flex>
  );
};
