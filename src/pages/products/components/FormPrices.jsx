import { Col, Form, InputNumber, Row, Switch } from 'antd'
import React from 'react'

function FormPrices() {
  return (
    <Row>
      <Col span={24}>
        <Form.Item label="Price" name='price' rules={[{ type: 'number', required: true, message: 'maydon bosh' }]} >
          <InputNumber style={{ width: '100%' }} controls={false} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Old Price" name='oldPrice' rules={[{ type: 'number', required: true, message: 'maydon bosh' }]} >
          <InputNumber style={{ width: '100%' }} controls={false} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Discount" name='discount' rules={[{ type: 'number', }]} >
          <InputNumber style={{ width: '100%' }} controls={false} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Is Offer" name='isOffer' rules={[{ type: 'boolean', message: 'maydon bosh' }]} >
          <Switch checkedChildren="Bor" unCheckedChildren="Yoq"/>
        </Form.Item>
      </Col>

    </Row>
  )
}

export default FormPrices