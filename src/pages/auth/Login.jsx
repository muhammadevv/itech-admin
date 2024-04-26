import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {

  const { addToken } = useAuth()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    setLoading(true)
    axios.post('https://ed3634daa39a78b5.mokky.dev/auth', values).then((res) => {
      if (res.data.token) {
        addToken(res.data.token)
        navigate("/")
      }
    }).catch(err => console.log(err, '💩💩💩')).finally(() => setLoading(false))
  }

  return (
    <div className='login-page'>

      <Card title='Login' style={{ width: 300 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading} >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>

  );
};
export default Login;