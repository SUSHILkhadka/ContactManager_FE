import { Button, Form, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux_toolkit/stores/store";
import { add } from "../../services/backendCallContact";
import { getContactBodyFromForm } from "../../utils/converter";
import contactSchema from "../../validations/contactSchema";
import Validator from "../../validations/Validator";
import "../styles/Button.css";
import UploadImage from "../utils/CustomUpload";
import BasicContactForm from "./BasicContactForm";

const AddContactForm: React.FC = () => {
  const [loading, setloading] = useState(false);
  const contactInfo = useSelector((state: RootState) => state.contact);
  const navigate = useNavigate();

  const defaultValue = {
    photograph: contactInfo.photograph,
  };

  const onFinish = async (values: any) => {
    setloading(true);
    const body = {
      ...getContactBodyFromForm(values),
      photograph: contactInfo.photograph,
    };
    try {
      Validator(body, contactSchema);
      const contact = await add(body);
      if (contact.data) {
        message.success(`Added contact successfully. Id is ${contact.data.id}`);
        navigate("/list");
      } else {
        message.error(contact.message);
      }
    } catch (e: any) {
      if (e.response) message.error(e.response.data.message);
      else message.error(e);
    }
    setloading(false);
  };

  return (
    <div className="">
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
          onFinish={onFinish}
        >
          <BasicContactForm />
          <div className="center">
            <Form.Item>
              <Button
                className="btn-addcontact btn"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Add new Contact to database
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddContactForm;
