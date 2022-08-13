import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeLoggedInWithInfo } from '../../redux_toolkit/slices/authSlice';
import { login } from '../../services/backendCallUser';
import { saveLoginResponse, setLogStatus } from '../../services/localStorage';

const LoginForm: React.FC = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

  const onFinish = async(values: any) => {
    const body = JSON.stringify({
        email: values.email,
        password: values.password,
      });
  
      try {
        const response = await login(body);
        console.log('login response', response);
  
        if (!response.accessToken) {
          message.error(`${response.message}`);
        } else {
          message.success(`${response.message}`);
          dispatch(makeLoggedInWithInfo(response));
  
          saveLoginResponse(JSON.stringify(response));
          setLogStatus(true);
          console.log('ffff ')
          navigate('/about');
        }
      } catch {
        message.success(`error logging in`);
      }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleClick=()=>{
    navigate('/register')
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
          LogIn
        </Button>
      </Form.Item>

      <Button onClick={handleClick}>New user?? Register</Button>

    </Form>
  );
};

export default LoginForm;