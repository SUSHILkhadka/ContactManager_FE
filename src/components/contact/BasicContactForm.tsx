import { HomeOutlined, LaptopOutlined, PhoneOutlined } from "@ant-design/icons";
import { Form, Input, Switch } from "antd";
import "../styles/Form.css";
const BasicContactForm = () => {
  return (
    <div className="form form-contact">
      <div className="form-row">
        <Form.Item
          className="form-wholefield"
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input contact's name!" }]}
        >
          <Input className="form-input-half" />
        </Form.Item>

        <Form.Item
          className="form-wholefield"
          rules={[
            {
              type: "email",
              message: "Please input valid email!",
            },
          ]}
          label="Email"
          name="email"
        >
          <Input className="form-input-half" />
        </Form.Item>
      </div>

      <div className="form-row">

      <Form.Item className="form-wholefield" label="Phone number" name="phoneNumber">
        <Input addonBefore={<PhoneOutlined spin />} className="form-input" />
      </Form.Item>

      <Form.Item className="form-wholefield" label="Work Number" name="workNumber">
        <Input addonBefore={<LaptopOutlined />} className="form-input" />
      </Form.Item>

      <Form.Item className="form-wholefield" label="Home Number" name="homeNumber">
        <Input addonBefore={<HomeOutlined />} className="form-input" />
      </Form.Item>
      </div>

      <div className="form-row">
      <Form.Item
          className="form-wholefield"
        label="Add to Favourites"
        name="favourite"
        valuePropName="checked"
      >
        <Switch className="form-input-switch" />
      </Form.Item>
      </div>

    </div>
  );
};

export default BasicContactForm;
