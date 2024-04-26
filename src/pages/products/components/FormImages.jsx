import { Button, Col, Form, Input, Row } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import React from 'react'
import { isUrlValid } from '../../../utils/helpers';

function FormImages() {
  return (
    <Row>
      <Col span={24}>
        <Form.Item label="Main image" name='image' rules={[{
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
      </Col>
      <Col span={24}>
        <Form.List
          name="images" >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field) => (
                <Form.Item
                  label='Image Url'
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[{
                      required: true,
                      whitespace: true,
                      validator: (_, value) => {
                        if (isUrlValid(value)) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Is not URL!'))
                      },
                    },
                    ]} >
                    <Input placeholder="passenger name" style={{ width: '90%', marginRight: 10, }} />
                  </Form.Item>
                  <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
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

export default FormImages