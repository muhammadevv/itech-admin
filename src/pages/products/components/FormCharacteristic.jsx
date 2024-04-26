import { Button, Col, Form, Input, Row, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import React from 'react'
import { isUrlValid } from '../../../utils/helpers';

function FormCharacteristic() {
  return (
    <Row>
      <Col span={12}>
        <Form.List
          name="attributes" >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <Form.Item
                  key={field.key}
                >
                  <Space>
                    <Form.Item
                      label='Title'
                      {...field}
                      name={[field.name, 'title']}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[{
                        required: true,
                        whitespace: true,
                        message: 'Place add title'
                      },
                      ]} >

                      <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                      label='Value'
                      {...field}
                      name={[field.name, 'value']}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[{
                        required: true,
                        whitespace: true,
                        message: 'Place add value'
                      },
                      ]} >

                      <Input placeholder="Value"/>
                    </Form.Item>
                    <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                  </Space>
                </Form.Item>

              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%', }}
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Col>
    </Row>
  )
}

export default FormCharacteristic