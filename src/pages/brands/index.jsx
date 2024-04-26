import React, { useState } from 'react'
import { Button, Modal, Card, Form, Input, Row, Col } from 'antd'
import { LoadingOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
import { brandsPatch, brandsPost, brandsList, brandsDelete, } from '../../constants/urls'
import useDeleteModal from '../../hooks/useDeleteModal'
import { isUrlValid } from '../../utils/helpers'
const { Meta } = Card

function BrandPage() {

  const [form] = Form.useForm()
  const postRequest = usePostRequest({ url: brandsPost })
  const patchRequest = usePatchRequest()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(null)
  const deleteModal = useDeleteModal()
  const { response: brands, loading, request: reload } = useLoad({ url: brandsList })

  const handleCancel = () => {
    setIsModalOpen(false)
    setIsUpdate(null)
    form.resetFields()
  }

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    form.submit()
  }

  const handleFinish = async (data) => {
    const { success } = isUpdate ? await patchRequest.request({ url: brandsPatch(isUpdate), data }) : await postRequest.request({ data })
    if(success){
      reload()
      handleCancel()
    }
  }


  const handleDelete = (id) => {
    deleteModal(brandsDelete(id), reload)
  }

  const handleEdit = (item) => {
    setIsUpdate(item.id)
    form.setFieldsValue(item)
    setIsModalOpen(true)
  }


  return (
    <div>
      <Card title='Brands' extra={<Button onClick={handleAdd} >+ Add Brand</Button>} loading={loading} >
        <Row gutter={[16, 16]}>
          {
            brands?.map(({ id, image, title}) => (
              <Col key={id}>
                <Card
                  style={{ width: 300, height: 300, overflow: 'hidden' }}
                  cover={<img style={{width: '100%', height: '180px', objectFit: 'contain'}} alt={title} src={image}/> }
                  actions={[
                    <Button key="setting" onClick={() => handleEdit({ id, image, title})} >
                      <EditOutlined />
                    </Button>,
                    <Button key="edit" danger onClick={() => handleDelete(id)} >
                      <DeleteOutlined />
                    </Button>
                  ]}
                >
                  <Meta title={title} />
                </Card>
              </Col>
            ))
          }

        </Row>
      </Card>

      <Modal 
      maskClosable={false} 
      title={ isUpdate ? 'Update Brand' : 'Add Brand' }
      open={isModalOpen} 
      onCancel={handleCancel} 
      okText={isUpdate ? 'Update' : 'Add'} 
      onOk={handleSubmit}>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item label="Title" name='title' rules={[{ type: 'string', required: true, message: 'maydon bosh' }]} >
            <Input placeholder='Apple' />
          </Form.Item>
          <Form.Item label="Image url" name='image' rules={[{
            type: 'string',
            required: true,
            validator: (_, value) => {
              if (isUrlValid(value)) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Is not URL!'))
            },
          }]} >
            <Input type='url' placeholder='Image' />
          </Form.Item>

        </Form>
      </Modal>
    </div>
  )
}


export default BrandPage