import React, { useState, useEffect } from 'react';
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
  Tooltip,
  Modal,
  DatePickerProps,
} from 'antd';
import dayjs from 'dayjs';
import './FlightSearchForm.scss';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { searchFlightAPI } from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
// @ts-ignore
import swap from '../../../assets/swap.png';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { saveSelectedDate } from '../../../store/app/action';
import { searchPlacesAPI } from '@client/services/searchPlacesServices';

interface FlightSearchFormProps {
  isStickyNav?: boolean;
}

const FlightSearchForm = ({ isStickyNav = false }: FlightSearchFormProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [isLoading, setIsLoading] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureCities, setDepartureCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [passengersObj, setPassengersObj] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const [cabinClassValue, setCabinClassValue] = useState<any>('economy');
  // console.log(
  //   'test',
  //   [...new Array(2)].map((item) => {
  //     return {
  //       type: 'adult',
  //     };
  //   }),
  // );
  const onFinish = async (values) => {
    // console.log('values', values);
    const { adult, child, infant } = passengersObj;

    const passengers = [
      ...[...new Array(adult)].map((item) => {
        return { type: 'adult' };
      }),
      // ...new Array(adult).map((item)=>{
      //   return {type:'adult'}
      // }),
      // ...new Array(adult).map((item)=>{
      //   return {type:'adult'}
      // })
      // , { child: child }, { infant: infant }
    ];

    const payload = {
      origin: values.origin,
      destination: values.destination,
      departure_date: values.departure_date?.toISOString(),
      cabin_class: cabinClassValue,
      passengers: passengers,
    };

    try {
      // @ts-ignore
      dispatch(saveSelectedDate(payload));
      setIsLoading(true);
      const response = await searchFlightAPI(payload);
      navigate(`/flight-details/${response.data?.offer_id}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const ticketType = [{ value: 'One Way' }];

  const cabinClass = [
    { label: 'Economy', value: 'economy' },
    { label: 'Premium(Business/First)', value: 'business' },
  ];

  const handlePassengersObj = (name, value) => {
    setPassengersObj((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    function handleResize() {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {};

  const handleStudentSearch = async (value, type) => {
    try {
      setIsSearching(true);
      const result = await searchPlacesAPI(value);
      type == 'origin'
        ? setDepartureCities(result?.data?.offer?.data)
        : setDestinationCities(result?.data?.offer?.data);
      setIsSearching(false);
    } catch (error) {
      setIsSearching(false);
      console.log('error', error);
    }
  };

  return (
    <>
      <div className="flight-search-form">
        <div className="paddingLR">
          <Form onFinish={onFinish} form={form}>
            <Row
              justify={'center'}
              style={{ alignItems: 'baseline', display: 'flex' }}
              className="autoCompleteHeight"
            >
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={isStickyNav ? 3 : 5}
                className="first-child position-relative"
              >
                <Form.Item
                  name="origin"
                  rules={[
                    {
                      required: true,
                      message: 'Select Departure city',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    className="autoCompletegeneral"
                    style={{ width: '100%' }}
                    placeholder="Select Departure City"
                    onChange={(value) => setOriginCity(value)}
                    onSearch={(value) => {
                      handleStudentSearch(value, 'origin');
                    }}
                    filterOption={false}
                    value={originCity}
                    loading={isSearching}
                  >
                    {departureCities?.map((item, index) => {
                      return (
                        <Select.Option value={item.iata_code} key={index}>
                          {item.city_name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={isStickyNav ? 3 : 5}
                className="place-holder"
              >
                <Form.Item
                  name="destination"
                  rules={[
                    {
                      required: true,
                      message: 'Select destination city',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select Arrival City"
                    optionFilterProp="children"
                    className="arrival-city"
                    onChange={(value) => setDestinationCity(value)}
                    onSearch={(value) => {
                      handleStudentSearch(value, 'destination');
                    }}
                    filterOption={false}
                    value={destinationCity}
                    loading={isSearching}

                  >
                    {destinationCities?.map((item, index) => {
                      return (
                        <Select.Option value={item.iata_code} key={index}>
                          {item.city_name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={4} className="on768Screen mTop">
                <Form.Item
                  name="travelType"
                  rules={[
                    {
                      required: true,
                      message: 'Select Travel Type',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select the Trip Type"
                    optionFilterProp="children"
                    options={ticketType}
                  />
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={isStickyNav ? 3 : 5}
                className="date-range"
              >
                <Form.Item
                  name="departure_date"
                  rules={[
                    {
                      required: true,
                      message: 'Select departure date',
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    onChange={onDateChange}
                    disabledDate={(current: dayjs.Dayjs) =>
                      current && current < dayjs().startOf('day')
                    }
                    format="DD/MM/YYYY"
                    className="form-input"
                    placeholder="Select Departure Date"
                  />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={isStickyNav ? 3 : 5}
                className="last-child"
              >
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
                    placement={isStickyNav ? 'bottom' : 'right'}
                    trigger="click"
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
                          <div className="dflex form">
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
                    onOpenChange={handleOpenChange}
                  >
                    <Tooltip
                      placement="right"
                      title={` Adult: ${passengersObj.adult}, Child:${passengersObj.child}, Infant:${passengersObj.infant}, Class:${cabinClassValue}`}
                    >
                      <Input
                        name="passenger"
                        key={`passenger:${passengersObj}`}
                        readOnly
                        value={` Adult: ${passengersObj.adult}, Child:${passengersObj.child}, Infant:${passengersObj.infant}, Class:${cabinClassValue}`}
                        style={{ borderRadius: '0px 6px 6px 0px' }}
                        placeholder="Enter passengers & class"
                        className="form-input"
                        onClick={() => {
                          setOpen(!open);
                        }}
                      />
                    </Tooltip>
                  </Popover>
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={
                  isStickyNav && screenSize.width === 1024
                    ? 5
                    : isStickyNav
                    ? 3
                    : 24
                }
                className="flexEnd center-on-mobile marginTop10"
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
    </>
  );
};

export default FlightSearchForm;
