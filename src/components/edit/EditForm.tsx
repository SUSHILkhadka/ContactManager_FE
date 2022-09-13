import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeLoggedOut } from "../../redux_toolkit/slices/authSlice";
import { RootState } from "../../redux_toolkit/stores/store";
import { editUser } from "../../services/backendCallUser";
import { saveLoginResponse } from "../../services/localStorageAndCookies";
import "../styles/Form.css";
const EditForm: React.FC = () => {
  const [loading, setloading] = useState(false);
  const authInfo = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValue = {
    email: authInfo.email,
    name: authInfo.username,
  };

  const onFinish = async (values: any) => {
    setloading(true);
    if (values.newPassword1 === values.newPassword2) {
      const body = JSON.stringify({
        name: values.name,
        password: values.newPassword1,
        oldPassword: values.oldPassword,
      });

      try {
        const response = await editUser(body);

        message.success(`${response.message}`);
        dispatch(makeLoggedOut());
        saveLoginResponse("");
        navigate("/login", { replace: true });
      } catch (e: any) {
        message.error("error editing!! " + e.response.data.message);
      }
    } else {
      message.error(`new password and retype new password must match`);
    }
    setloading(false);
  };

  return (
    <div className="form form-edit">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValue}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email">
          <Input className="form-input" disabled />
        </Form.Item>
        <Form.Item
          label="User Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="form-input" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword1"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="form-input" />
        </Form.Item>
        <Form.Item
          label="Retype New Password"
          name="newPassword2"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="form-input" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            className="btn"
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Confirm Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditForm;
