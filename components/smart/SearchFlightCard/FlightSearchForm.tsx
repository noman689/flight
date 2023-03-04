import React, { useState } from 'react';
import axios from 'axios';
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
import { Link } from 'react-router-dom';
import { debug } from 'webpack';

const FlightSearchForm: React.FC = ({ apiData, setApiData }) => {
  const [value, setValue] = useState("economy");

  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [dataObj, setDataObj] = useState({
    departure: '',
    destination: '',
    date: ''
  })
  const [returnDate, setReturnDate] = useState<any>()
  const [passengersObj, setPassengersObj] = useState({
    adult: 1,
    child: 0,
    infant: 0
  })
  const [cabinClassValue, setCabinClassValue] = useState<any>('economy')
  const url = 'https://api.duffel.com/air/offer_requests?return_offers=false';
  const token = 'duffel_test_Uh48ncnbR0dwmqAIODjC3aYC9Em-LxgqAsMB98u9kPD';

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Accept-Encoding": "gzip",
    "Duffel-Version": "v1"
  };

  const onFinish = (values: any) => {
    const { departure, destination, date } = dataObj;
    const { adult, child, infant } = passengersObj;

    const slices = [
      {
        origin: departure,
        destination: destination,
        departure_date: date,
      },
      {
        origin: destination,
        destination: departure,
        departure_date: date,
      },
    ];

    const passengers = [
      ...Array(adult).fill({ type: 'adult' }),
      ...Array(child).fill({ type: 'child' }),
      ...Array(infant).fill({ age: 1 }),
    ];

    const data = {
      slices: slices,
      passengers: passengers,
      cabin_class: cabinClassValue,
    };
    axios.post(url, { slices }, { headers })
      .then(response => {
        setApiData(response)
      })
      .catch(error => {
        console.error(error);
      });
    console.log(data, "data");
  };

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const destinationCities = [
    {
      sub: "BKK",
      city: "Bangkok"
    },
    {
      sub: "HKG",
      city: "Hong Kong"
    },
    {
      sub: "LAX",
      city: "Los Angeles"
    },
    {
      sub: "SYD",
      city: "Sydney"
    },
    {
      sub: "LHR",
      city: "London"
    }
  ];

  const departureCities = [
    {
      sub: "NYC",
      city: "New York"
    },
    {
      sub: "LAX",
      city: "Los Angeles"
    },
    {
      sub: "SFO",
      city: "San Francisco"
    },
    {
      sub: "ORD",
      city: "Chicago"
    },
    {
      sub: "MIA",
      city: "Miami"
    }
  ];
  const cabinClass = [
    { label: 'Economy', value: 'economy' },
    { label: 'Premium(Business/First)', value: 'business' },

  ];
  const handleDepartureObj = (name, value) => {
    if (name == "date") {
      const [start, end] = value;
      setReturnDate(end.format('YYYY-MM-DD'));
      setDataObj(prevState => ({
        ...prevState,
        [name]: start.format('YYYY-MM-DD')
      }));
    }
    else {
      setDataObj(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handlePassengersObj = (name, value) => {
    setPassengersObj[name] = value
  }
  return (
    <div className="flight-search-form">
      <div className="paddingLR">
        <Form onFinish={onFinish}>
          <Row justify={'center'}>
            <Col xs={24} sm={24} md={24} lg={5}>

              <Form.Item
                name="departure"
                rules={[
                  { required: true, message: 'Select the departure city' },
                ]}
              >
                <Select
                  showArrow={false}
                  showSearch
                  // style={{ height: '55px' }}
                  placeholder="Select departure city"
                  // className="form-input"
                  onChange={(value) => handleDepartureObj("departure", value)}
                >
                  {departureCities.map((e) => {
                    return (
                      <Option value={e.sub}>{e.city}</Option>
                    );
                  })}

                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={5}>
              <Form.Item
                name="destination"
                rules={[
                  { required: true, message: 'select the destination city' },
                ]}
              >
                <Select
                  onChange={(value) => handleDepartureObj("destination", value)}
                  showArrow={false}
                  showSearch
                  // style={{ height: '55px' }}
                  placeholder="Select the destination city"
                // className="form-input"
                >
                  {destinationCities.map((e) => {
                    return (
                      <Option value={e.sub}>{e.city}</Option>
                    );
                  })}

                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={4}>
              <Form.Item
                name="Trip"
                rules={[
                  { required: true, message: 'select the desired Trip' },
                ]}
              >
                <Select
                  // style={{ height: '55px' }}
                  placeholder="Return"
                  className="form-input"
                >
                  <Option selected value="1">Return</Option>
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
                    message: 'Select travel dates',
                  },
                ]}
              >
                <RangePicker
                  onChange={(value) => handleDepartureObj("date", value)}
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
                    required: false,
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
                            min={0}
                            max={10}
                            defaultValue={1}
                            value={passengersObj.adult}
                            onChange={(value) => handlePassengersObj("adult", value)}

                          />
                        </div>
                        <div className="dflex">
                          <span>Child (2-11 Years)</span>
                          <Form.Item
                            name="passengers-class"
                            rules={[
                              {
                                required: false,
                                message: 'Please Enter passengers & class',
                              },
                            ]}
                          >
                            <InputNumber
                              min={0}
                              max={10}
                              defaultValue={0}
                              value={passengersObj.child}
                              onChange={(value) => handlePassengersObj("child", value)}
                            />
                          </Form.Item>
                        </div>
                        <div className="dflex">
                          <span>Infant (Under 2 years)</span>
                          <InputNumber
                            min={0}
                            max={10}
                            defaultValue={0}
                            onChange={(value) => handlePassengersObj("infant", value)}
                            value={passengersObj.infant}
                          />
                        </div>
                      </div>
                      <Divider />
                      <div>
                        <span className="fontSize20 ">Class</span>
                      </div>
                      <div>
                        <Radio.Group
                          value={cabinClassValue}
                          onChange={(event) => setCabinClassValue(event.target.value)}
                        >
                          <Space direction="vertical">
                            {cabinClass.map((e) => (
                              <Radio className="classColor" value={e.value}>
                                {e.label}
                              </Radio>
                            ))}
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
              {/* <Link to="/flight-details"> */}
              <Button
                type="default"
                htmlType="submit"
                className="form-button btnSearchFlight"
              >
                Show Flights
              </Button>
              {/* </Link> */}
            </Col>
          </Row>
        </Form>
      </div>
      {/* <div className="search-button-wrapper"></div> */}
    </div>
  );
};

export default FlightSearchForm;
