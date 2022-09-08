import React, {useEffect, useState} from "react";
import { Button, Form, Input,Upload, } from "antd";
import { createProduct } from '../../store/actions';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import {  Modal } from 'antd';


export const CreateProduct = () => {
  const dispatch = useDispatch();
  const [form]=Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false);
    

  const showModal = (e) => {
    setIsModalOpen(true);
    form.resetFields()
  };

  const handleOk = () => {
    setIsModalOpen(false);
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(createProduct(values));
    
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <div>
       <Button type="primary" onClick={showModal}>
        Create Item
      </Button>
      <Modal
      footer={null} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={form}
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

        <Form.Item label="Upload"  name="image">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        <Form.Item>



          

          <Button onClick={handleOk} type="primary" htmlType="submit"   >
            Save
          </Button>
        </Form.Item>
        
      </Form>
      </Modal>
      

    


      
    </div>
  );
};
