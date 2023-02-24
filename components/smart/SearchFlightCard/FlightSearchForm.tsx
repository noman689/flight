

import React from "react";
import { Card, Form, Input, Select, DatePicker, Button } from "antd";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

import "./FlightSearchForm.scss";

const FlightSearchForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Card className="flight-search-form">
      <Form onFinish={onFinish}>
      <div className="form-group">

          <Form.Item
            className="form-item"
            name="from"
            rules={[{ required: true, message: "Please input the departure city!" }]}
          >
            <Input placeholder=" Enter Departure City" className="form-input" />
          </Form.Item>
          <Form.Item
            className="form-item"
            name="to"
            rules={[{ required: true, message: "Please input the destination city!" }]}
          >
            <Input placeholder="Enter Destination City" className="form-input" />
          </Form.Item>
          <Form.Item
            className="form-item"
            name="Trip"
            rules={[{ required: true, message: "Please select the desired Trip" }]}
          >
            <div className="form-group">
            <Select placeholder="Return" >
              <Option value="1">Return</Option>
              <Option value="2">One-Way</Option>
              <Option value="3">Multi-City</Option>
            </Select>
            </div>
          
          </Form.Item>
        </div>
        <div className="form-group">
          <Form.Item
            className="form-item"
            name="dates"
            rules={[{ required: true, message: "Please select the travel dates!" }]}
          >
            <RangePicker
              disabledDate={(current: dayjs.Dayjs) => current && current < dayjs().startOf("day")}
              format="DD/MM/YYYY"
              className="form-input"
            />
          </Form.Item>
          <Form.Item
            className="form-item"
            name="passengers"
            rules={[{ required: true, message: "Please select the number of passengers!" }]}
          >
            <Select placeholder="Number of Passengers" className="form-select">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Form.Item>
        </div>
     
      </Form>
      <div className="form-button">
          <Form.Item>
            <Button type="default" htmlType="submit" className="form-button">
              Search Flights
            </Button>
          </Form.Item>
        </div>
    </Card>
  );
};

export default FlightSearchForm;
