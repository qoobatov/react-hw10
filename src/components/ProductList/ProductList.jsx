import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List, Form } from 'antd';
import { fetchProducts, setModalState, setEditProduct, setModalType } from './../../store/actions'
import { deleteProduct } from './../../store/actions'
import { CreateProduct } from '../ProductForm/CreateProduct';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Action } from 'history';

export const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products).sort((a, b) => b.id - a.id)
  const productsLoading = useSelector((store) => store.productsLoading)
  const isModalOpen = useSelector((store) => store.isModalOpen)
  const [form] = Form.useForm()
  const editProduct = useSelector((store) => store.editProduct)
  const isModalCreate = useSelector((store) => store.isModalCreate)

  useEffect(() => {
    // setInterval(()=>{
    //   console.log('2')
    // },1000)

    dispatch(fetchProducts())
  }, [])


  const showModal = () => {
    dispatch(setModalState(true));
  };

  const closeModal = () => {
    dispatch(setModalState(false));
  }

  const handleEdit = (values) => {
    dispatch(setEditProduct(values))
    showModal()
    dispatch(setModalType(false))
  }

  const deleteItem = (values) => {
    dispatch(deleteProduct(values))

  }


  return (
    <div>

      <CreateProduct />
      <h1>Products</h1>
      <List
        loading={productsLoading}
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={<div>{item.price}</div>}
            />
            <DeleteOutlined
              onClick={() => { deleteItem(item.id) }

              }
            />
            <EditOutlined onClick={() => handleEdit(item)} />
          </List.Item>
        )}
      />
    </div>
  )
}
