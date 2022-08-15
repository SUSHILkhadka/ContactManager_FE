import {
  Button,

  Form,
  message,

} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { add } from "../../services/backendCallContact";
import BasicContactForm from "./BasicContactForm";

type SizeType = Parameters<typeof Form>[0]["size"];

const AddContactForm: React.FC = () => {
  const navigate=useNavigate();
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const defaultValue = {
    photograph: "http://bucket.myphotourl",
  };

  const onFinish= async (values: any) => {
    console.log(values);
    const body = JSON.stringify({
      name: values.name,
      phoneNumber: values.phoneNumber,
      favourite: Boolean(values.favourite),
      photograph: values.photograph,
      age: values.age,
    });

    
    try {
      const contact = await add(body);
      console.log(contact);
      message.success(`Added contact successfully. Id is ${contact.data.id}`);
      navigate('/contact/list');
    } catch {
      message.error(`error adding contact to database`);
    }
  };

  const onFinishFailed = (_values: any) => {
    console.log('fill all values');
  };


  return (
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

      <BasicContactForm/>
      
      <Form.Item label="Button">
        <Button type="primary" htmlType="submit">
          Add new Contact to database
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddContactForm;
