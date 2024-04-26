import React, { useState } from 'react'
import { Button, Card, Drawer, Form, Image, Space, Switch, Table, Tabs } from 'antd'
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
import { productsPatch, productsList, productsPost, productsDelete } from '../../constants/urls'
import useDeleteModal from '../../hooks/useDeleteModal'
import { FormPrices, FormRatings, FormTexts, FormImages, FormCharacteristic } from './components';

function Products() {

  const [form] = Form.useForm()
  const postRequest = usePostRequest({ url: productsPost })
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const deleteModal = useDeleteModal()

  const { response: products, loading, request: reload } = useLoad({ url: productsList })

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => <Image src={image} width={80} height={80} style={{ objectFit: 'contain' }} />
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => <span>{price.toLocaleString()} sum</span>
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      render: (st) => <span>{st ? 'Bor' : 'Qolmagan'}</span>
    },
    {
      title: 'Is Recommended',
      render: (item) => (
        <Switch checkedChildren='True' 
        unCheckedChildren="False" 
        defaultChecked={item.isRecommended} 
        onChange={(e) => handleRecommended(e, item.id)} />
      )
    },
    {
      title: 'Actions',
      render: (item) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(item)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => deleteModal(productsDelete(item.id), reload)} />
        </Space>
      )
    },
    
  ]

  const handleRecommended = async (e, id) => {
    const { success } = await patchRequest.request({ url: productsPatch(id), data : {isRecommended: e} })
    if (success) {
      reload()
    }
  }

  const handleEdit = (item) => {
    form.setFieldsValue(item)
    setIsUpdate(item.id)
    setIsModalOpen(true)
  }

  const handleFinish = async (data) => {
    const { success } = isUpdate ? await patchRequest.request({ url: productsPatch(isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      reload()
      handleCanel()
    }
  }

  const handleCanel = () => {
   setIsModalOpen(false)
    setIsUpdate(null)
    form.resetFields()
  } 

  const handleSubmit = () => {
    form.submit()
  }


  const handleAdd = () => {
    setIsModalOpen(true)
  }

  const items = [
    {
      key: '1',
      label: 'Text fields',
      children: <FormTexts form={form} />,
    },
    {
      key: '2',
      label: 'Price fields',
      children: <FormPrices />,
    },
    {
      key: '3',
      label: 'Rating fields',
      children: <FormRatings />,
    },
    {
      key: '4',
      label: 'Images fields',
      children: <FormImages form={form} />,
    },
    {
      key: '5',
      label: 'Characteristic fields',
      children: <FormCharacteristic />,
    },
  ];

  return (
    <>
      <Card title='Products' extra={<Button onClick={handleAdd} >+ Add</Button>}>
        <Table dataSource={products} columns={columns} loading={loading} rowKey='id' ></Table>

        <Drawer title={`${isUpdate ? 'Update' : 'Add'} product`} onClose={handleCanel} open={isModalOpen} width={800} extra={<Button onClick={handleSubmit} >{isUpdate ? 'Update' : 'Add'}</Button>} >
          <Form layout='vertical' form={form} onFinish={handleFinish} >
            <Tabs defaultActiveKey="1" items={items} type='card' />
          </Form>
        </Drawer>
      </Card>


    </>
  )
}

export default Products