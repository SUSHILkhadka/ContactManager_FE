import { Button, Form, message } from "antd";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux_toolkit/stores/store";
import { add } from "../../services/backendCallContact";
import UploadImage from "../utils/UploadImage";
import BasicContactForm from "./BasicContactForm";

import image from "../../assets/github.png";

type SizeType = Parameters<typeof Form>[0]["size"];

const AddContactForm: React.FC = () => {
  const contactInfo = useSelector((state: RootState) => state.contact);
  const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const defaultValue = {
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
      const contact = await add(body);
      if (contact.data) {
        message.success(`Added contact successfully. Id is ${contact.data.id}`);
        navigate("/contact/list");
      } else {
        message.error(contact.message);
      }
    } catch {
      message.error(`error adding contact to database`);
    }
  };

  const onFinishFailed = (_values: any) => {
    console.log("fill all values");
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
          <img className="img-avatar" src={image} alt="loadingasdf" />
        )}
      </div>
      <div className="center">
        <UploadImage />
      </div>
      <div className="contact-form">
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

          <Form.Item label="Button">
            <Button type="primary" htmlType="submit" className="btn">
              Add new Contact to database
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddContactForm;
