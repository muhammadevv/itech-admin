import { Button, Card, Drawer, Table } from 'antd'
import React, { useState } from 'react'
import { EyeOutlined, } from '@ant-design/icons';
import { useLoad } from '../../hooks/request'
import { ordersList } from '../../constants/urls'

function OrdersPage() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewElement, setviewElement] = useState(null)

  const { response: orders, loading, request: reload } = useLoad({ url: ordersList })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'User name',
      dataIndex: 'fullname',
    },
    {
      title: 'User address',
      dataIndex: 'address',
    },
    {
      title: 'Product title',
      dataIndex: 'product',
      render: (product) => <span>{product.title}</span>
    },
    {
      title: 'Actions',
      render: (item) => (
        <Button icon={<EyeOutlined />} onClick={() => handleView(item)} />
      )
    },
  ]

  const handleCanel = () => {
    setIsModalOpen(false)
    setviewElement(null)
  }

  const handleView = (item) => {
    setviewElement(item)
    setIsModalOpen(true)
  }

  return (
    <>
      <Card title='Orders'>
        <Table dataSource={orders} columns={columns} loading={loading} rowKey='id' ></Table>
        <Drawer title="Order" onClose={handleCanel} open={isModalOpen && !!viewElement} width={800} >
          {
            JSON.stringify(viewElement)
          }
        </Drawer>
      </Card>


    </>
  )
}

export default OrdersPage