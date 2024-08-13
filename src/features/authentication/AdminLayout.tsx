import { useCallback } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { ConfigProvider, Flex, Layout, Menu, Popconfirm, theme } from "antd";
import {
  ProfileOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Logo } from "../../ui/Logo";
import { LogoSize } from "../../types/Types";
import { useEffect } from "react";
import { User } from "./User";
import { useCanLogout } from "../../hooks/CanLogout";

const { Header, Content, Footer, Sider } = Layout;

export const AdminLayout = () => {
  const navigate = useNavigate(); // Hook for navigation
  const canLogout = useCanLogout();
  const {
    token: { colorBgContainer, borderRadiusLG, colorTextHeading }, // Extract theme tokens
  } = theme.useToken();

  // Handle menu item clicks
  const handleMenuClick = useCallback(
    (e: any) => {
      switch (e.key) {
        case "UserProfile":
          navigate("profile");
          break;
        case "Restaurants":
          navigate("restaurants/list");
          break;
        case "Logout":
          canLogout && navigate("/login");
          break;
      }
    },
    [canLogout, navigate]
  );

  // Define menu items for the sidebar
  const menuItems = [
    { key: "UserProfile", icon: <UserOutlined />, label: "Profile" },
    { key: "Restaurants", icon: <ProfileOutlined />, label: "Restaurants" },
    {
      key: "Logout",
      icon: <LogoutOutlined />,
      label: (
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
      ),
    },
  ];

  // Redirect to Restaurants page on initial mount
  useEffect(() => {
    handleMenuClick({ key: "Restaurants" });
  }, [handleMenuClick]);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      {/* Main layout container */}
      <Layout className="admin-layout" data-testid="admin-layout">
        {/* Sidebar */}
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" data-testid="sidebar-logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["Restaurants"]}
            items={menuItems}
            onClick={handleMenuClick}
            data-testid="sidebar-menu"
          />
        </Sider>
        {/* Main content area */}
        <Layout>
          <Header
            className="logo-header"
            style={{ background: colorBgContainer }}
            data-testid="header"
          >
            <Flex justify="space-between">
              <Flex>
                <Logo size={LogoSize.Small} data-testid="logo" />
                <h1
                  className="logo-header-h1"
                  style={{ color: colorTextHeading }}
                  data-testid="header-title"
                >
                  Foodie Delight - <span>admin</span>
                </h1>
              </Flex>
              <User data-testid="user-info" />
            </Flex>
          </Header>
          <Content
            className="content-container"
            data-testid="content-container"
          >
            <div
              style={{
                padding: 24,
                height: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              data-testid="content-wrapper"
            >
              <Outlet />
            </div>
          </Content>
          <Footer className="copy-right" data-testid="footer">
            Foodie Delight ©{new Date().getFullYear()} Created by Thinkbridge
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};
