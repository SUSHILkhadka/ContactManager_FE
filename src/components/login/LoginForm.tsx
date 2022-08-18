import { Button, Form, Input, message } from 'antd';
// import Upload from "antd/lib/upload/Upload";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeLoggedInWithInfo } from '../../redux_toolkit/slices/authSlice';
import { login } from '../../services/backendCallUser';
import {
  saveAccessToken,
  saveLoginResponse,
  saveRefreshToken,
  setLogStatus,
} from '../../services/localStorageAndCookies';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    const body = JSON.stringify({
      email: values.email,
      password: values.password,
    });
    setloading(true);
    try {
      const response = await login(body);
      dispatch(makeLoggedInWithInfo(response));

      saveLoginResponse(JSON.stringify(response));
      saveAccessToken(response.accessToken);
      saveRefreshToken(response.refreshToken, response.expiresAtRefreshToken);
      setLogStatus(true);
      navigate('/home');
      message.success(`${response.message}`);
    } catch (e: any) {
      message.error(e.response.data.message);
    }
    setloading(false);
  };

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className="form form-login">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className="form-input" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" className="btn" loading={loading}>
            LogIn
          </Button>
          <Button onClick={handleClick}>New user?? Register</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
