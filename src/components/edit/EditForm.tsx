import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  makeLoggedOut } from '../../redux_toolkit/slices/authSlice';
import { editUser } from '../../services/backendCallUser';
import { saveAccessToken, saveLoginResponse, saveRefreshToken, setLogStatus } from '../../services/localStorage';

const EditForm: React.FC = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();

  const onFinish = async(values: any) => {
    if(values.newPassword1===values.newPassword2){

    const body = JSON.stringify({
        name: values.name,
        password: values.newPassword1,
        oldPassword: values.oldPassword,
      });
  
      try {
        const response = await editUser(body);
        if (!response.data) {
          message.error(`${response.message}`);
        } else {
          message.success(`${response.message}`);
  
        dispatch(makeLoggedOut());
        setLogStatus(false);
        saveLoginResponse('');
        saveAccessToken('');
        saveRefreshToken('');
        navigate('/login', { replace: true });
        }
      } catch {
        message.success(`error logging in`);
      }
    }
    else{
        message.error(`new password and retype new password must match`);

    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


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
        label="Old Password"
        name="oldPassword"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="newPassword1"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Retype New Password"
        name="newPassword2"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>



      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditForm;