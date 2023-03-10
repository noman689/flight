import React, { useState } from 'react';
import {
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
  AutoComplete,
} from 'antd';
import dayjs from 'dayjs';
import './FlightSearchForm.scss';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { searchFlightAPI } from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
import swap from '../../../assets/swap.png';

const FlightSearchForm: React.FC = () => {
  const [value, setValue] = useState('economy');
  const navigate = useNavigate();

  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [isLoading, setIsLoading] = useState(false);
  const [dataObj, setDataObj] = useState({
    departure: '',
    destination: '',
    date: '',
  });
  const [returnDate, setReturnDate] = useState<any>();
  const [passengersObj, setPassengersObj] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const [cabinClassValue, setCabinClassValue] = useState<any>('economy');

  const onFinish = async (values: any) => {
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
    try {
      setIsLoading(true);
      // await searchFlightAPI(data);
      navigate('/flight-details');
    } catch (error) {
      setIsLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const destinationCities = [
    { value: 'Bangkok' },
    { value: 'Hong Kong' },
    { value: 'Los Angeles' },
    { value: 'Sydney' },
    { value: 'London' },
  ];

  const departureCities = [
    { value: 'New York' },
    { value: 'Los Angeles' },
    { value: 'San Francisco' },
    { value: 'Miami' },
    { value: 'Chicago' },
  ];
  const ticketType = [
    { value: 'Return' },
    { value: 'One Way' },
    { value: 'Multi City' },
  ];

  const cabinClass = [
    { label: 'Economy', value: 'economy' },
    { label: 'Premium(Business/First)', value: 'business' },
  ];
  const handleDepartureObj = (name, value) => {
    if (name == 'date') {
      const [start, end] = value;
      setReturnDate(end.format('YYYY-MM-DD'));
      setDataObj((prevState) => ({
        ...prevState,
        [name]: start.format('YYYY-MM-DD'),
      }));
    } else {
      setDataObj((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handlePassengersObj = (name, value) => {
    setPassengersObj[name] = value;
  };
  return (
    <div className="flight-search-form">
      <div className="paddingLR">
        <Form onFinish={onFinish}>
          <Row>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={5}
              className="first-child position-relative"
            >
              <AutoComplete
                style={{ width: '100%', borderRadius: '6px 0 0 6px' }}
                options={departureCities}
                placeholder="Select Departure City"
                filterOption={(inputValue, option) =>
                  option!.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />

              <img
                className="position-absolute top-0 start-100 translate-middle"
                style={{
                  width: '30px',
                  zIndex: 1,
                  marginTop: '29px',
                  border: '1px solid #6c1542',
                  borderRadius: '100%',
                }}
                src={swap}
              />
            </Col>

            <Col xs={24} sm={24} md={24} lg={5} className="place-holder">
              <AutoComplete
                style={{ width: '100%' }}
                options={destinationCities}
                placeholder="Select Arrival City"
                filterOption={(inputValue, option) =>
                  option!.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={4}>
              <AutoComplete
                style={{ width: '100%' }}
                options={ticketType}
                placeholder="Select the Desired Trip"
                filterOption={(inputValue, option) =>
                  option!.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
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
                  onChange={(value) => handleDepartureObj('date', value)}
                  disabledDate={(current: dayjs.Dayjs) =>
                    current && current < dayjs().startOf('day')
                  }
                  format="DD/MM/YYYY"
                  className="form-input"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={5} className="last-child">
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
                            onChange={(value) =>
                              handlePassengersObj('adult', value)
                            }
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
                              onChange={(value) =>
                                handlePassengersObj('child', value)
                              }
                            />
                          </Form.Item>
                        </div>
                        <div className="dflex">
                          <span>Infant (Under 2 years)</span>
                          <InputNumber
                            min={0}
                            max={10}
                            defaultValue={0}
                            onChange={(value) =>
                              handlePassengersObj('infant', value)
                            }
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
                          onChange={(event) =>
                            setCabinClassValue(event.target.value)
                          }
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
                    style={{ borderRadius: '0px 6px 6px 0px' }}
                    placeholder="Enter passengers & class"
                    className="form-input"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  />
                </Popover>
              </Form.Item>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              className="flexEnd center-on-mobile "
            >
              <Button
                type="default"
                htmlType="submit"
                className="form-button btnSearchFlight"
              >
                {isLoading ? (
                  <Spin />
                ) : (
                  <span className="showFlightBtn">
                    <span style={{ fontSize: '20px' }}>Show Flights</span>
                    <img
                      className="flighiconsize"
                      src="https://www.svgrepo.com/show/346908/flight-takeoff.svg"
                    />
                  </span>
                )}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default FlightSearchForm;
