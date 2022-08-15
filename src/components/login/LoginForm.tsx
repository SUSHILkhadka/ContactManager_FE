import { Button, Form, Input, message } from "antd";
// import Upload from "antd/lib/upload/Upload";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeLoggedInWithInfo } from "../../redux_toolkit/slices/authSlice";
import { login } from "../../services/backendCallUser";
import {
  saveAccessToken,
  saveLoginResponse,
  saveRefreshToken,
  setLogStatus,
} from "../../services/localStorage";
import { UploadOutlined } from "@ant-design/icons";
import { URL_TO_BACKEND } from "../../constants/common";
import { Upload, Progress } from "antd";
import axios from "axios";
import CustomUpload from "../utils/UploadImage";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const onFinish = async (values: any) => {
    const body = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    try {
      const response = await login(body);
      console.log("login response", response);

      if (!response.accessToken) {
        message.error(`${response.message}`);
      } else {
        message.success(`${response.message}`);
        dispatch(makeLoggedInWithInfo(response));

        saveLoginResponse(JSON.stringify(response));
        saveAccessToken(response.accessToken);
        saveRefreshToken(response.refreshToken);
        setLogStatus(true);
        console.log("ffff ");
        navigate("/about");
      }
    } catch(e) {
      message.error(`error logging in`+e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleClick = () => {
    navigate("/register");
  };



  return (
    <div>
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
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>



    

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="btn">
          LogIn
        </Button>
        <Button onClick={handleClick}>New user?? Register</Button>
      </Form.Item>
    </Form>


</div>
  );
};

export default LoginForm;
