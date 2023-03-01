// import React from "react";
// import { Card, Form, Input, Select, DatePicker, Button } from "antd";
// import dayjs from "dayjs";

// const { Option } = Select;
// const { RangePicker } = DatePicker;
// import "./FlightSearchForm.scss";

// const FlightSearchForm: React.FC = () => {
//   const onFinish = (values: any) => {
//     console.log("Received values of form: ", values);
//   };

//   return (
//     <div className="flight-search-form">
//       <Form onFinish={onFinish}>
//         <Form.Item
//           name="from"
//           rules={[{ required: true, message: "Please input the departure city!" }]}
//         >
//           <Input placeholder=" Enter Departure City" className="form-input" />
//         </Form.Item>
//         <Form.Item
//           name="to"
//           rules={[{ required: true, message: "Please input the destination city!" }]}
//         >
//           <Input placeholder="Enter Destination City" className="form-input" />
//         </Form.Item>
//         <Form.Item
//           name="Trip"
//           rules={[{ required: true, message: "Please select the desired Trip" }]}
//         >
//           <Select placeholder="Return">
//             <Option value="1">Return</Option>
//             <Option value="2">One-Way</Option>
//             <Option value="3">Multi-City</Option>
//           </Select>
//         </Form.Item>
//         <Form.Item
//           name="dates"
//           rules={[{ required: true, message: "Please select the travel dates!" }]}
//         >
//           <RangePicker
//             disabledDate={(current: dayjs.Dayjs) =>
//               current && current < dayjs().startOf("day")
//             }
//             format="DD/MM/YYYY"
//           />
//         </Form.Item>
//         <Form.Item
//           name="passengers"
//           rules={[
//             { required: true, message: "Please select the number of passengers!" },
//           ]}
//         >
//           <Select placeholder="Number of Passengers">
//             <Option value="1">1</Option>
//             <Option value="2">2</Option>
//             <Option value="3">3</Option>
//             <Option value="4">4</Option>
//           </Select>
//         </Form.Item>
//         <div className="search-button-wrapper">
//           <Form.Item>
//             <Button type="default" htmlType="submit" className="form-button">
//               Search Flights
//             </Button>
//           </Form.Item>
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default FlightSearchForm;
import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Popover,
  InputNumber,
  Divider,
  Radio,
} from 'antd';
import dayjs from 'dayjs';
import './FlightSearchForm.scss';
import type { RadioChangeEvent } from 'antd';
import { Space } from 'antd';

const FlightSearchForm: React.FC = () => {
  const [value, setValue] = useState(1);

  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="flight-search-form">
      <div className="paddingLR">
        <Form onFinish={onFinish}>
          <Row justify={'center'}>
            <Col xs={24} sm={24} md={24} lg={5}>
              <Form.Item
                name="from"
                rules={[
                  {
                    required: true,
                    message: 'Please input the departure city!',
                  },
                ]}
              >
                <Input
                  placeholder="Enter Departure City"
                  className="form-input"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={5}>
              <Form.Item
                name="to"
                rules={[
                  {
                    required: true,
                    message: 'Please input the destination city!',
                  },
                ]}
              >
                <Input
                  placeholder="Enter Destination City"
                  className="form-input"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4}>
              <Form.Item
                name="Trip"
                rules={[
                  { required: true, message: 'Please select the desired Trip' },
                ]}
              >
                <Select
                  // style={{ height: '55px' }}
                  placeholder="Return"
                  className="form-input"
                >
                  <Option value="1">Return</Option>
                  <Option value="2">One-Way</Option>
                  <Option value="3">Multi-City</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={5}>
              <Form.Item
                name="dates"
                rules={[
                  {
                    required: true,
                    message: 'Please select the travel dates!',
                  },
                ]}
              >
                <RangePicker
                  disabledDate={(current: dayjs.Dayjs) =>
                    current && current < dayjs().startOf('day')
                  }
                  format="DD/MM/YYYY"
                  className="form-input"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={5}>
              <Form.Item
                name="passengers-class"
                rules={[
                  {
                    required: true,
                    message: 'Please Enter passengers & class',
                  },
                ]}
              >
                <Popover
                  content={
                    <div>
                      <div>
                        <span className="fontSize20">Passengers</span>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <div className="dflex">
                          <span>Adult (12+ Years)</span>

                          <InputNumber
                            min={1}
                            max={10}
                            defaultValue={3}
                            // onChange={onChange}
                          />
                        </div>
                        <div className="dflex">
                          <span>Child (2-11 Years)</span>
                          <InputNumber
                            min={1}
                            max={10}
                            defaultValue={3}
                            // onChange={onChange}
                          />
                        </div>
                        <div className="dflex">
                          <span>Infant (Under 2 years)</span>
                          <InputNumber
                            min={1}
                            max={10}
                            defaultValue={3}
                            // onChange={onChange}
                          />
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <span className="fontSize20 ">Class</span>
                      </div>
                      <div>
                        <Radio.Group value={value}>
                          <Space direction="vertical">
                            <Radio className="classColor" value={1}>
                              Economy
                            </Radio>
                            <Radio className="classColor" value={2}>
                              Premium(Busniess/First)
                            </Radio>
                          </Space>
                        </Radio.Group>
                      </div>
                    </div>
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Input
                    placeholder="Enter passengers & class"
                    className="form-input"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  />
                </Popover>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={23} className="flexEnd ">
              <Button
                type="default"
                htmlType="submit"
                className="form-button btnSearchFlight"
              >
                Show Flights
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      {/* <div className="search-button-wrapper"></div> */}
    </div>
  );
};

export default FlightSearchForm;
