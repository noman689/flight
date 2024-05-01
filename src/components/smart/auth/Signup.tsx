import React, { useState } from 'react';
import { Form, Input, Button, Alert, Row, Col } from 'antd';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router';

const Signup = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = (values: { email: any; password: any }) => {
    const { email, password } = values;
    const auth = getAuth();
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage); // Display error message on UI
        setLoading(false);
      });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col>
        <Form
          form={form}
          name="register"
          onFinish={handleSignup}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
        {error && <Alert message={error} type="error" showIcon />}
        <Button
          type="link"
          onClick={() => {
            form.resetFields();
            history.push('/login');
          }}
        >
          Already have an account? Log in
        </Button>
      </Col>
    </Row>
  );
};

export default Signup;
