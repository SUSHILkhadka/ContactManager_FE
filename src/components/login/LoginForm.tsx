import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeLoggedInWithInfo } from "../../redux_toolkit/slices/authSlice";
import { login } from "../../services/backendCallUser";
import { saveLoginResponse } from "../../services/localStorageAndCookies";
import loginSchema from "../../validations/loginSchema";
import Validator from "../../validations/Validator";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    setloading(true);
    const body = {
      email: values.email,
      password: values.password,
    };
    try {
      Validator(body, loginSchema);
      const response = await login(body);

      dispatch(makeLoggedInWithInfo(response));
      saveLoginResponse(response);
      navigate("/home");
      message.success(`${response.message}`);
    } catch (e: any) {
      if (e.response) message.error(e.response.data.message);
      else message.error(e);
    }

    setloading(false);
  };

  const handleClick = () => {
    navigate("/register");
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
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="form-input" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn"
            loading={loading}
          >
            LogIn
          </Button>
          <Button onClick={handleClick}>New user?? Register</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
