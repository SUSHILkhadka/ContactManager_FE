import { Button, Form, message, Popconfirm } from "antd";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux_toolkit/stores/store";
import { deleteContact, editContact } from "../../services/backendCallContact";
import { getEditContactBodyFromForm } from "../../utils/converter";
import contactSchema from "../../validations/contactSchema";
import Validator from "../../validations/Validator";
import CustomUpload from "../utils/CustomUpload";
import BasicContactForm from "./BasicContactForm";

type SizeType = Parameters<typeof Form>[0]["size"];

const EditContactForm: React.FC = () => {
  const [loading, setloading] = useState(false);
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
    setloading(true);
    const body = {
      ...getEditContactBodyFromForm(values),
      photograph: contactInfo.photograph,
    };
    try {
      console.log("body = ",body)
      Validator(body, contactSchema);
      const contact = await editContact(body, contactInfo.id);

      message.success(`${contact.message}. Id is ${contact.data.id}`);
      navigate("/list");
    } catch (e: any) {
      if (e.response) message.error(e.response.data.message);
      else message.error(e);
    }
    setloading(false);
  };

  const handleDelete = async (_values: any) => {
    try {
      const contact = await deleteContact(contactInfo.id);
      if (contact.data) {
        message.success(`${contact.message}. Id is ${contact.data.id}`);
      }
      navigate("/list");
    } catch (e: any) {
      message.error("error deleting!! " + e.response.data.message);
    }
  };

  return (
    <div>
      <div className="center">
        <CustomUpload />
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
          <Button
            type="primary"
            htmlType="submit"
            className="btn btn-addcontact"
            loading={loading}
          >
            Save changes to Contact
          </Button>

          <Popconfirm
            placement="top"
            title={"Are you sure?"}
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn btn-delete">Delete from database</Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditContactForm;
