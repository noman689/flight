import { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { login } from '../../../services/authService';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const handleLogin = async ({ email, password }) => {
    try {
      await login(email, password, dispatch);
      history.goBack();
    } catch (error) {
      console.error('Failed to login', error);
    }
  };
  return (
    <div className="login-container">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col>
          <Form form={form} layout="vertical" onFinish={handleLogin}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
          <Button
            type="link"
            onClick={() => {
              form.resetFields();
              history.push('/signup');
            }}
          >
            Sign Up Instead
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
