import { Form, Input, InputNumber, Radio, Switch } from "antd";
import { UserOutlined } from "@ant-design/icons";
const BasicContactForm = () => {
  return (
    <div>
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input contact's name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone number"
        name="phoneNumber"
        rules={[{ required: true, message: "Please input phonenumber!" }]}
      >
        <InputNumber
          addonBefore={<UserOutlined />}
          controls={false}
          style={{ width: "40%" }}
        />
      </Form.Item>

      <Form.Item
        label="Add to Favourite"
        name="favourite"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>


    </div>
  );
};

export default BasicContactForm;
