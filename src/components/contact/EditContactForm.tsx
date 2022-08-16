import { Button, Form, message } from "antd";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux_toolkit/stores/store";
import { deleteContact, editContact } from "../../services/backendCallContact";
import UploadImage from "../utils/UploadImage";
import BasicContactForm from "./BasicContactForm";
import image from "../../assets/github.png";

type SizeType = Parameters<typeof Form>[0]["size"];

const EditContactForm: React.FC = () => {
  const contactInfo = useSelector((state: RootState) => state.contact);
  const navigate = useNavigate();

  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

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
    const body = JSON.stringify({
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      workNumber: values.workNumber,
      homeNumber: values.homeNumber,
      favourite: Boolean(values.favourite),
      photograph: contactInfo.photograph,
      age: values.age,
    });

    try {
      const contact = await editContact(body, contactInfo.id);
      message.success(`${contact.message}. Id is ${contact.data.id}`);
      navigate("/contact/list");
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const onFinishFailed = (_values: any) => {
    console.log("fill all values");
  };
  const handleDelete = async (_values: any) => {
    try {
      const contact = await deleteContact(contactInfo.id);
      if (contact.data) {
        message.success(`${contact.message}. Id is ${contact.data.id}`);
      } else {
        message.error(`${contact.message}`);
      }
      navigate("/contact/list");
    } catch (e) {
      message.error(`${e}`);
    }
  };

  return (
    <div>
      <div className="center">
        {Boolean(contactInfo.photograph) ? (
          <img
            className="img-avatar"
            src={contactInfo.photograph}
            alt="Loading"
          />
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
        onFinishFailed={onFinishFailed}
      >
        <BasicContactForm />

        <Form.Item label="Save">
          <Button type="primary" htmlType="submit" className="btn">
            Save changes to Contact
          </Button>
        <Button onClick={handleDelete}>Delete from database</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditContactForm;
