import React, { useState } from 'react'
import { Button, Card, Form, Image, Input, Modal, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
import { bannerList, bannerPost, bannerDelete, bannerPatch } from '../../constants/urls'
import useDeleteModal from '../../hooks/useDeleteModal'
import { isUrlValid } from '../../utils/helpers';

function Banner() {
  const [form] = Form.useForm()
  const postRequest = usePostRequest({ url: bannerPost })
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const deleteModal = useDeleteModal()

  const { response: banners, loading, request: reload } = useLoad({ url: bannerList })


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
    const { success } = isUpdate ? await patchRequest.request({ url: bannerPatch(isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      reload()
      handleCancel()
    }
  }

  const handleEdit = (item) => {
    setIsUpdate(item.id)
    form.setFieldsValue(item)
    setIsModalOpen(true)
  }

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
      title: 'Subtitle',
      dataIndex: 'toptitle',
    },
    {
      title: 'Actions',
      render: (item) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(item)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => deleteModal(bannerDelete(item.id), reload )} />
        </Space>
      )
    }
  ]



  return (
    <>
      <Card title='Banner' extra={<Button onClick={handleAdd} >+ Add</Button>}>
        <Table dataSource={banners} columns={columns} loading={loading} rowKey='id' ></Table>
      </Card>

      <Modal
        maskClosable={false}
        title={isUpdate ? 'Update' : 'Add'}
        open={isModalOpen}
        onCancel={handleCancel}
        okText={isUpdate ? 'Update' : 'Add'}
        onOk={handleSubmit}>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item label="Toptitle" name='toptitle' rules={[{ type: 'string', required: true, message: 'maydon bosh' }]} >
            <Input placeholder='Toptitle' />
          </Form.Item>
          <Form.Item label="Title" name='title' rules={[{ type: 'string', required: true }]} >
            <Input placeholder='Title' />
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
    </>
  )
}

export default Banner