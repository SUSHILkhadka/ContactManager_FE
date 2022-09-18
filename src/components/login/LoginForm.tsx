import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeLoggedInWithInfo } from '../../redux_toolkit/slices/authSlice';
import { login } from '../../services/backendCallUser';
import { saveLoginResponse } from '../../services/localStorageAndCookies';
import { getLoginBodyFromForm } from '../../utils/converter';
import loginSchema from '../../validations/loginSchema';
import Validator from '../../validations/Validator';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();

  const onFinish = async (values: FormData) => {
    setloading(true);
    const body = getLoginBodyFromForm(values);
    try {
      Validator(body, loginSchema);
      const response = await login(body);

      dispatch(makeLoggedInWithInfo(response));
      saveLoginResponse(response);
      navigate('/', { replace: true });
      message.success(`${response.message}`);
    } catch (e: any) {
      if (e.response) message.error(e.response.data.message);
      else message.error(e);
    }

    setloading(false);
  };

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className='form-container2'>
      <Form
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete='off'
        layout='vertical'
        className='form-antd-form'
      >
        <Form.Item
          className='form-single '
          label='Email'
          name='email'
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input className='form-input' />
        </Form.Item>

        <Form.Item
          className='form-single '
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className='form-input' />
        </Form.Item>

        <Form.Item className='form-button-register'>
          <Button
            type='primary'
            htmlType='submit'
            className='btn'
            loading={loading}
          >
            LogIn
          </Button>
        </Form.Item>

        <Form.Item className='form-button-register'>
          <Button onClick={handleClick}>New user?? Register Instead</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
