import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List, Spin } from 'antd';
import {fetchProducts} from './../../store/actions'
import {deleteProduct} from './../../store/actions'
import { CreateProduct } from '../ProductForm/CreateProduct';
import { DeleteOutlined } from '@ant-design/icons';

export const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products)
  const productsLoading = useSelector((store) => store.productsLoading)

  useEffect(() => {
    dispatch(fetchProducts())

  }, [])

  const deleteItem = (values)=>{
    dispatch(deleteProduct(values))
    
    console.log(values)
  }

  console.log('products', products)
  
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
                onClick={()=>{deleteItem(item.id)}
              
                }
              />
          </List.Item>
        )}
      />
    </div>
  )
}
