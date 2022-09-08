import React from "react";
import { Button, Form, Input } from "antd";
import { createProduct } from '../../store/actions';
import { useDispatch } from 'react-redux';

export const CreateProduct = () => {
  const dispatch = useDispatch();
  
  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(createProduct(values))
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>Create Product</h1>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Product Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input Product Price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
