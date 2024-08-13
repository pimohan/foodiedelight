import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import type { FormProps } from "antd";
import { Button, Checkbox, Flex, Form, Input, Card } from "antd";

// Define the type for form fields
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

// Function to handle successful form submission
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

// Function to handle failed form submission
const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const LoginForm = () => {
  // Access authentication context and navigation
  const { login, setUsername } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // Handle login button click
  const handleLogin = async () => {
    form
      .validateFields()
      .then(async (values: any) => {
        console.log(values); // Log form values
        setUsername(values.username); // Set username in auth context
        login(); // Trigger login function from auth context
        navigate("/admin"); // Navigate to admin page on successful login
      })
      .catch((errorInfo: any) => {
        console.log("LoginFormError", errorInfo); // Log error
      });
  };

  // Reset form fields
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div data-testid="login-form">
      <Flex justify="center" vertical align="center">
        <Card style={{ width: 400 }} data-testid="login-card">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            data-testid="login-form-inner"
          >
            {/* Username input field */}
            <Form.Item
              label="Username"
              name="username"
              initialValue="Admin"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input data-testid="username-input" />
            </Form.Item>

            {/* Password input field */}
            <Form.Item
              label="Password"
              name="password"
              initialValue="Admin@12345"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password data-testid="password-input" />
            </Form.Item>

            {/* Remember me checkbox */}
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox data-testid="remember-checkbox">Remember me</Checkbox>
            </Form.Item>

            {/* Submit and reset buttons */}
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="button"
                onClick={handleLogin}
                style={{ marginRight: 8 }}
                data-testid="submit-button"
              >
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={onReset}
                data-testid="reset-button"
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  );
};
