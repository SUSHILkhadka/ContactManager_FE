import { Form, Input, InputNumber, Switch } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import '../styles/Form.css';
const BasicContactForm = () => {
  return (
    <div className="form-contact">
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input contact's name!" }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="Phone number" name="phoneNumber">
        <InputNumber addonBefore={<UserOutlined />} controls={false} style={{ width: '40%' }} />
      </Form.Item>

      <Form.Item label="Work Number" name="workNumber">
        <Input />
      </Form.Item>

      <Form.Item label="Home Number" name="homeNumber">
        <Input />
      </Form.Item>

      <Form.Item label="Add to Favourite" name="favourite" valuePropName="checked">
        <Switch />
      </Form.Item>
    </div>
  );
};

export default BasicContactForm;
