import { Form, Input, InputNumber, Switch } from 'antd';
import { HomeOutlined, PhoneOutlined, LaptopOutlined } from '@ant-design/icons';
import '../styles/Form.css';
const BasicContactForm = () => {
  return (
    <div className="form form-contact">
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input contact's name!" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="Phone number" name="phoneNumber">
        <Input addonBefore={<PhoneOutlined spin />} style={{ width: '50%' }} />
      </Form.Item>

      <Form.Item label="Work Number" name="workNumber">
        <Input addonBefore={<LaptopOutlined />} style={{ width: '50%' }} />
      </Form.Item>

      <Form.Item label="Home Number" name="homeNumber">
        <Input addonBefore={<HomeOutlined />} style={{ width: '50%' }} />
      </Form.Item>

      <Form.Item label="Add to Favourite" name="favourite" valuePropName="checked">
        <Switch />
      </Form.Item>
    </div>
  );
};

export default BasicContactForm;
