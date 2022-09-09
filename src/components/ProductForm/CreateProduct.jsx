import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, } from "antd";
import { createProduct, setModalState, editProducts, setEditProduct } from '../../store/actions';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import Item from "antd/lib/list/Item";


export const CreateProduct = () => {
  const dispatch = useDispatch();
  const editProduct = useSelector((store) => store.editProduct)
  const isModalOpen = useSelector((store) => store.isModalOpen)
  const isModalCreate = useSelector((store) => store.isModalCreate)
  const [form] = Form.useForm()


  useEffect(() => {
    if (!editProduct) return
    form.setFieldsValue(editProduct)

  }, [form, editProduct])




  const showModal = () => {
    dispatch(setModalState(true));

  };

  const closeModal = () => {
    dispatch(setModalState(false));
    dispatch(setEditProduct(null))
    form.resetFields()
  }



  const onFinish = (values) => {
    if (editProduct) {
      dispatch(editProducts(values, editProduct.id))
      dispatch(setEditProduct(null))
    } else {
      dispatch(createProduct(values))
    }

    setTimeout(() => {
      form.resetFields()
    }, 0);

    dispatch(setModalState(false))

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  const title = editProduct ? 'Update' : 'Create'
  const modalTitle = editProduct ? 'Update Product' : 'Create Product'




  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create Item
      </Button>
      <Modal
        footer={null} title={modalTitle} open={isModalOpen} onCancel={closeModal}>
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

          <Form.Item
            label="Image"
            name="image"
            valuePropName="file"
          >
            <Upload
              accept=".png, .jpg"
              listType='picture-card'
              beforeUpload={() => false}
              multiple={false}
              maxCount={1}
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {title}
            </Button>
          </Form.Item>
        </Form>
      </Modal>






    </div>
  );
};
