import { Button, Form, message, Popconfirm } from 'antd';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux_toolkit/stores/store';
import { deleteContact, editContact } from '../../services/backendCallContact';
import UploadImage from '../utils/CustomUpload';
import BasicContactForm from './BasicContactForm';
import image from '../../assets/github.png';
import { changePage } from '../../redux_toolkit/slices/pageSlice';
import { LIST_CONTACT_PAGE } from '../../constants/common';

type SizeType = Parameters<typeof Form>[0]['size'];

const EditContactForm: React.FC = () => {
  const [loading, setloading] = useState(false);
  const contactInfo = useSelector((state: RootState) => state.contact);
  const dispatch = useDispatch();

  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
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
    const body = JSON.stringify({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      workNumber: values.workNumber,
      homeNumber: values.homeNumber,
      favourite: Boolean(values.favourite),
      photograph: contactInfo.photograph,
      // age: values.age,
    });

    try {
      const contact = await editContact(body, contactInfo.id);
      message.success(`${contact.message}. Id is ${contact.data.id}`);
      dispatch(changePage(LIST_CONTACT_PAGE));
    } catch (e: any) {
      message.error('error editing!! ' + e.response.data.message);
    }
    setloading(false);
  };

  const handleDelete = async (_values: any) => {
    try {
      const contact = await deleteContact(contactInfo.id);
      if (contact.data) {
        message.success(`${contact.message}. Id is ${contact.data.id}`);
      }
      dispatch(changePage(LIST_CONTACT_PAGE));
    } catch (e: any) {
      message.error('error deleting!! ' + e.response.data.message);
    }
  };

  return (
    <div>
      <div className="center">
        {Boolean(contactInfo.photograph) ? (
          <img className="img-avatar" src={contactInfo.photograph} alt="Loading" />
        ) : (
          <img className="img-avatar" src={image} alt="loading" />
        )}
      </div>
      <div className="center">
        <UploadImage />
      </div>
      <Form
        className="form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={defaultValue}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        onFinish={onFinish}
      >
        <BasicContactForm />

        <Form.Item label="Save">
          <Button type="primary" htmlType="submit" className="btn btn-addcontact" loading={loading}>
            Save changes to Contact
          </Button>

          <Popconfirm placement="top" title={'Are you sure?'} onConfirm={handleDelete} okText="Yes" cancelText="No">
            <Button className="btn btn-delete">Delete from database</Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditContactForm;
