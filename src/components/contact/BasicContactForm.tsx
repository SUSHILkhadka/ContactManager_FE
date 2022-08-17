import { Form, Input, InputNumber, Switch } from 'antd';
import { HomeOutlined, PhoneOutlined, LaptopOutlined } from '@ant-design/icons';
import '../styles/Form.css';
const BasicContactForm = () => {
  return (
    <div className="form form-contact">
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input contact's name!" }]}>
        <Input className="form-input" />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input className="form-input" />
      </Form.Item>

      <Form.Item label="Phone number" name="phoneNumber">
        <Input addonBefore={<PhoneOutlined spin />} className="form-input" />
      </Form.Item>

      <Form.Item label="Work Number" name="workNumber">
        <Input addonBefore={<LaptopOutlined />} className="form-input" />
      </Form.Item>

      <Form.Item label="Home Number" name="homeNumber">
        <Input addonBefore={<HomeOutlined />} className="form-input" />
      </Form.Item>

      <Form.Item label="Add to Favourite" name="favourite" valuePropName="checked">
        <Switch />
      </Form.Item>
    </div>
  );
};

export default BasicContactForm;
