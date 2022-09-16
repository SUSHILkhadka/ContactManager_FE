import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/backendCallUser";
import { getRegisterBodyFromForm } from "../../utils/converter";
import registerSchema from "../../validations/registerSchema";
import Validator from "../../validations/Validator";
import "../styles/App.css";
const RegisterForm: React.FC = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setloading(true);
    const body = getRegisterBodyFromForm(values);
    try {
      Validator(body, registerSchema);
      const response = await register(body);

      message.success(`${response.message}`);
      navigate("/");
    } catch (e: any) {
      if (e.response) message.error(e.response.data.message);
      else message.error(e);
    }
    setloading(false);
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="form-container2">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          className="form-single "
          label="User Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className="form-input2" />
        </Form.Item>
        <Form.Item
          className="form-single "
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
          <Input className="form-input2" />
        </Form.Item>

        <Form.Item
          className="form-single "
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="form-input2" />
        </Form.Item>
        <Form.Item
          className="form-single "
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input confirmation password!" },
          ]}
        >
          <Input.Password className="form-input2" />
        </Form.Item>
        <Form.Item
          className="form-single "
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input confirmation password!" },
          ]}
        >
          <Input className="form-input2" />
        </Form.Item>

        <Form.Item className="form-button-register">
          <Button
            type="primary"
            htmlType="submit"
            className="btn"
            loading={loading}
          >
            Register
          </Button>
        </Form.Item>
        <Form.Item className="form-button-register">
          <Button onClick={handleClick}>Already has account?? Login </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
