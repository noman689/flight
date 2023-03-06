import React, { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  Row,
  Col,
  RadioChangeEvent,
  Card,
  Button,
} from 'antd';
import './PassengerDetailsForm.scss';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
interface PassengerDetailsFormProps {
  onSubmit: (data: any) => void;
}
const PassengerDetailsForm: React.FC<PassengerDetailsFormProps> = ({
  onSubmit,
}) => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Card title="Passenger Details" style={{ marginLeft: '12px' }}>
      <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        className="passenger-details-form"
        onFinish={onSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="firstName">
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="lastName">
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="dob">
              <DatePicker placeholder="DOB" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="nationality">
              <Select placeholder="Nationality">
                <Select.Option value="usa">USA</Select.Option>
                <Select.Option value="uk">UK</Select.Option>
                <Select.Option value="france">France</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="title">
              <Radio.Group
                onChange={onChange}
                value={value}
                className="radio-group"
              >
                <div className="radio-box">
                  <Radio value={'male'}>Male</Radio>
                </div>
                <div className="radio-box">
                  <Radio value={'female'}>Female</Radio>
                </div>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Passport Details</h3>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="passportNumber">
              <Input placeholder="Passport Number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="passportExpiryDate">
              <DatePicker placeholder="Passport Expiry Date" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Travel Details</h3>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item name="documentType">
              <Select placeholder="Travel Documents Type">
                <Select.Option value="usa">USA</Select.Option>
                <Select.Option value="uk">UK</Select.Option>
                <Select.Option value="france">France</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="country">
              <Select placeholder="Country">
                <Select.Option value="usa">USA</Select.Option>
                <Select.Option value="uk">UK</Select.Option>
                <Select.Option value="france">France</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Button type="primary" htmlType="submit">
              Add other Passanger data
            </Button>
          </Col>
          <Col style={{ marginLeft: '12px' }}>
            <Button type="default">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default PassengerDetailsForm;
