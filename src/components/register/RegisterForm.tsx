import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../services/backendCallUser';

const RegisterForm: React.FC = () => {
    const navigate=useNavigate();

  const onFinish = async(values: any) => {
    const body = JSON.stringify({
        name:values.name,
        email: values.email,
        password: values.password,
      });
  
      try {
        const response = await register(body);
        console.log('register response', response);
  
        if (!response.data) {
          message.error(`${response.message}`);
        } else {
          message.success(`${response.message}`);
          navigate('/');
        }
      } catch(e) {
        message.success(`error registerging in`);
      }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleClick=()=>{
    navigate('/login')
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <Form.Item
        label="User Name"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      <Button onClick={handleClick}>Already has account?? Login</Button>

    </Form>
  );
};

export default RegisterForm;