import { Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect } from 'react'
import { useLoad } from '../../../hooks/request'
import { brandsList, categoriesList } from '../../../constants/urls'
import { slugify } from '../../../utils/helpers'

function FormTexts({ form }) {

  const { response: brands, brandsLoading, } = useLoad({ url: brandsList })
  const { response: categories, categoriesLoading, } = useLoad({ url: categoriesList })
  const title = Form.useWatch('title', form)

  useEffect(() => {
    if (title && title.length) {
      form.setFieldValue('slug', slugify(title))
    }
  }, [title])


  return (
    <Row layout='vertical' >
      <Col span={24}>
        <Form.Item label="Name" name='name' rules={[{ required: true, message: 'maydon bosh' }]} >
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Title" name='title' rules={[{ required: true, message: 'maydon bosh' }]} >
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Slug" name='slug' style={{ display: 'none' }} >
          <Input placeholder='smartphones..' disabled value={title} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Model" name='model' rules={[{ required: true, message: 'maydon bosh' }]} >
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Category" name='category_id' rules={[{ required: true, message: 'maydon bosh' }]} >
          <Select loading={categoriesLoading} onChange={(e) => form.setFieldValue('brand_id', e)} options={categories?.map(item => ({ value: item.id, label: item.title }))} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Brand" name='brand_id' rules={[{ required: true, message: 'maydon bosh' }]} >
          <Select loading={brandsLoading} onChange={(e) => form.setFieldValue('brand_id', e)} options={brands?.map(item => ({ value: item.id, label: item.title }))} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label='Description' name='desc' rules={[{ type: 'string' }]}>
          <Input.TextArea rows={4} placeholder='...' />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default FormTexts