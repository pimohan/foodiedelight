import { Card, Flex, Form, Input } from "antd";
import { PageHeader } from "../../ui/PageHeader";
import { useAuth } from "../../contexts/AuthContext";

const UserProfile = () => {
  const [form] = Form.useForm();
  const { username } = useAuth();

  return (
    <>
      <PageHeader />
      <Flex justify="center" vertical align="center">
        <Card style={{ width: 400 }} data-testid="login-card">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            form={form}
          >
            <Form.Item label="Username" name="username" initialValue={username}>
              <Input readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Full Name"
              name="fullName"
              initialValue="User One"
            >
              <Input readOnly={true} />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              initialValue="admin@thinkbridge.in"
            >
              <Input readOnly={true} />
            </Form.Item>

            <Form.Item label="Type" name="type" initialValue="Admin">
              <Input readOnly={true} />
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </>
  );
};

export default UserProfile;
