import { Button, Form, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux_toolkit/stores/store';
import { editContact } from '../../services/backendCallContact';
import { getEditContactBodyFromForm } from '../../utils/converter';
import contactSchema from '../../validations/contactSchema';
import Validator from '../../validations/Validator';
import '../styles/Form.css';
import CustomUpload from '../utils/CustomUpload';
import BasicContactForm from './BasicContactForm';

const EditContactForm: React.FC = () => {
  const [loading, setloading] = useState(false);
  const contactInfo = useSelector((state: RootState) => state.contact);
  const navigate = useNavigate();

  const defaultValue = {
    id: contactInfo.id,
    name: contactInfo.name,
    email: contactInfo.email,
    workNumber: contactInfo.workNumber,
    homeNumber: contactInfo.homeNumber,
    phoneNumber: contactInfo.phoneNumber,
    favourite: contactInfo.favourite,
    photograph: contactInfo.photograph,
  };

  const onFinish = async (values: any) => {
    setloading(true);
    const body = {
      ...getEditContactBodyFromForm(values),
      photograph: contactInfo.photograph,
    };
    try {
      Validator(body, contactSchema);
      const contact = await editContact(body, contactInfo.id);
      message.success(`${contact.message}. Id is ${contact.data.id}`);
      navigate('/list');
    } catch (e: any) {
      if (e.response) message.error(e.response.data.message);
      else message.error(e);
    }
    setloading(false);
  };

  return (
    <div>
      <div className='center'>
        <CustomUpload />
      </div>
      <div className='form-container'>
        <Form
          layout='vertical'
          initialValues={defaultValue}
          onFinish={onFinish}
        >
          <BasicContactForm />

          <div className='form-row'>
            <Form.Item className='form-wholefield'>
              <Button
                type='primary'
                htmlType='submit'
                className='btn btn-addcontact'
                loading={loading}
              >
                Save changes to Contact
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditContactForm;
