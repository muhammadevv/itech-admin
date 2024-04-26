import { Col, Form, Input, InputNumber, Row } from 'antd'
import React from 'react'

function FormRatings() {
  return (
    <Row>
      <Col span={24}>
        <Form.Item label="Sold" name='sold' rules={[{ required: true, message: 'maydon bosh' }]} >
          <Input />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Review count" name='reviewCount' rules={[{ type: 'number', required: true, message: 'maydon bosh' }]} >
          <InputNumber style={{ width: '100%' }} controls={false} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Rating" name='reting' rules={[{ type: 'number', required: true, message: 'maydon bosh' }]} >
          <InputNumber style={{ width: '100%' }} controls={false} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default FormRatings