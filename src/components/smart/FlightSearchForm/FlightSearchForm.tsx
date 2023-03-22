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
  AutoComplete,
  Tooltip,
  Modal,
} from 'antd';
import dayjs from 'dayjs';
import './FlightSearchForm.scss';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { searchFlightAPI } from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
// @ts-ignore
import swap from '../../../assets/swap.png';
import moment from 'moment';
import { Drawer } from 'antd';

interface FlightSearchFormProps {
  isStickyNav?: boolean;
}

const FlightSearchForm = ({ isStickyNav = false }: FlightSearchFormProps) => {
  const [value, setValue] = useState('economy');
  const navigate = useNavigate();

  const { Option } = Select;
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [isLoading, setIsLoading] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [dataObj, setDataObj] = useState({
    departure: '',
    destination: '',
    date: '',
    trip: '',
  });
  const [returnDate, setReturnDate] = useState<any>();
  const [passengersObj, setPassengersObj] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const [cabinClassValue, setCabinClassValue] = useState<any>('economy');

  const onFinish = async (values: any) => {
    const { departure, destination, date, trip } = dataObj;
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

    const oneWay = [
      {
        origin: departure,
        destination: destination,
        departure_date: date,
      },
    ];

    const route = [
      {
        origin: departure,
        destination: destination,
        departure_date: date,
      },
    ];

    // const passengers = [
    //   ...Array(adult).fill({ type: 'adult' }),
    //   ...Array(child).fill({ type: 'child' }),
    //   ...Array(infant).fill({ age: 1 }),
    // ];

    const passengers = [{ adult: adult }, { child: child }, { infant: infant }];

    const data = {
      ...(trip === 'return' ? { slices } : { oneWay }),
      passengers: passengers,
      cabin_class: cabinClassValue,
    };
    console.log(data);
    try {
      setIsLoading(true);
      // await searchFlightAPI(data);
      navigate('/flight-details');
    } catch (error) {
      setIsLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

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
  // const handleDepartureObj = (name, value) => {
  //   if (name === 'date') {
  //     const startDate = value[0] ? moment(value[0]).format('MMMM Do YYYY') : '';
  //     const endDate = value[1] ? moment(value[1]).format('MMMM Do YYYY') : '';
  //     setReturnDate(endDate);
  //     setDataObj((prevState) => ({
  //       ...prevState,
  //       [name]: startDate,
  //     }));
  //   } else if (name === 'startDate' || name === 'endDate') {
  //     const formattedDate = value ? moment(value).format('MMMM Do YYYY') : '';
  //     setReturnDate(formattedDate);

  //     if (name === 'endDate') {
  //       setReturnDate(formattedDate);
  //     } else {
  //       setDataObj((prevState) => ({
  //         ...prevState,
  //         [name]: formattedDate,
  //       }));
  //     }
  //   } else {
  //     setDataObj((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };
  const handleDepartureObj = (name, value) => {
    switch (name) {
      case 'date':
        const startDate = value[0]
          ? moment(value[0]).format('MMMM Do YYYY')
          : '';
        const endDate = value[1] ? moment(value[1]).format('MMMM Do YYYY') : '';
        setReturnDate(endDate);
        setDataObj((prevState) => ({
          ...prevState,
          [name]: startDate,
        }));
        break;
      case 'startDate':
      case 'endDate':
        const formattedDate = value ? moment(value).format('MMMM Do YYYY') : '';
        setReturnDate(formattedDate);
        if (name === 'endDate') {
          setReturnDate(formattedDate);
        } else {
          setDataObj((prevState) => ({
            ...prevState,
            ['date']: formattedDate,
          }));
        }
        break;
      default:
        setDataObj((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
    }
  };

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
  const showDrawer = () => {
    setDrawerOpen(true);

    // if (screenSize.width > 768) {
    //   setDatePickerOpen(true);
    // }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  // console.log(returnDate, 'returnDate');
  // console.log(dataObj, 'dataObj');
  return (
    <>
      {screenSize.width < 768 && (
        <Modal
          // title="Select Date"
          // placement={'left'}
          width={screenSize.width}
          onCancel={closeDrawer}
          open={drawerOpen}
          // extra={
          //   <Space>
          //     <Button onClick={closeDrawer}>Cancel</Button>
          //     <Button type="primary" onClick={closeDrawer}>
          //       OK
          //     </Button>
          //   </Space>
          // }
        >
          <div>
            <div>
              <Form>
                <Form.Item>
                  <span>Start Date</span>

                  <RangePicker
                    getPopupContainer={() => document.body}

                    // onChange={onChange}
                  />
                </Form.Item>
              </Form>
            </div>
            <br />
            <div>
              <span>End Date</span>

              <DatePicker
              // onChange={onChange}
              />
            </div>
          </div>
        </Modal>
      )}
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
                {/* <AutoComplete
                  onChange={(value) => handleDepartureObj('departure', value)}
                  className="autoCompletegeneral"
                  options={departureCities}
                  placeholder="Select Departure City"
                  filterOption={(inputValue, option) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                /> */}
                <Select
                  allowClear
                  className="autoCompletegeneral"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Departure City"
                  optionFilterProp="children"
                  // filterOption={(input, option) =>
                  //   (option?.label ?? '').includes(input)
                  // }
                  // filterSort={(optionA, optionB) =>
                  //   (optionA?.label ?? '')
                  //     .toLowerCase()
                  //     .localeCompare((optionB?.label ?? '').toLowerCase())
                  // }
                  options={departureCities}
                />

                <img
                  className="position-absolute top-0 start-100 translate-middle hide"
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

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={isStickyNav ? 3 : 5}
                className="place-holder "
              >
                {/* <AutoComplete
                  onChange={(value) => handleDepartureObj('destination', value)}
                  style={{ width: '100%' }}
                  options={destinationCities}
                  placeholder="Select Arrival City"
                  filterOption={(inputValue, option) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                /> */}
                <Select
                  allowClear
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Arrival City"
                  optionFilterProp="children"
                  className="arrival-city"
                  // filterOption={(input, option) =>
                  //   (option?.label ?? '').includes(input)
                  // }
                  // filterSort={(optionA, optionB) =>
                  //   (optionA?.label ?? '')
                  //     .toLowerCase()
                  //     .localeCompare((optionB?.label ?? '').toLowerCase())
                  // }
                  options={destinationCities}
                />
              </Col>
              <Col
                xs={screenSize.width <= 768 ? 12 : 24}
                sm={screenSize.width <= 768 ? 12 : 24}
                md={screenSize.width <= 768 ? 12 : 24}
                lg={4}
                className="on768Screen mTop"
              >
                {/* <AutoComplete
                  onChange={(value) => handleDepartureObj('trip', value)}
                  style={{
                    width: '100%',
                  }}
                  options={ticketType}
                  placeholder="Select the Desired Trip"
                  filterOption={(inputValue, option) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                /> */}
                <Select
                  allowClear
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select the Desired Trip"
                  optionFilterProp="children"
                  // filterOption={(input, option) =>
                  //   (option?.label ?? '').includes(input)
                  // }
                  // filterSort={(optionA, optionB) =>
                  //   (optionA?.label ?? '')
                  //     .toLowerCase()
                  //     .localeCompare((optionB?.label ?? '').toLowerCase())
                  // }
                  options={ticketType}
                />
              </Col>
              {screenSize.width <= 768 && (
                <Col
                  xs={12}
                  sm={12}
                  md={12}
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
                      // open={open}
                      onOpenChange={handleOpenChange}
                    >
                      <Tooltip
                        title={` Adult: ${passengersObj.adult}, Child:${passengersObj.child}, Infant:${passengersObj.infant}, Class:${cabinClassValue}`}
                      >
                        <Input
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
              )}
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={isStickyNav ? 3 : 5}
                className="date-range"
              >
                {!(screenSize.width < 768) ? (
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
                      disabled={screenSize.width < 768}
                      // open={datePickerOpen}
                      // onClick={showDrawer}
                      style={{ width: '100%' }}
                      onChange={(value) => handleDepartureObj('date', value)}
                      disabledDate={(current: dayjs.Dayjs) =>
                        current && current < dayjs().startOf('day')
                      }
                      format="DD/MM/YYYY"
                      className="form-input"
                    />
                  </Form.Item>
                ) : (
                  // <div onClick={showDrawer} className="sectionDates">
                  //   <div className="datesDiv datesBorder1">
                  //     <span className="route">Depart</span>
                  //     <span className="dates">31 Dec 2023</span>
                  //   </div>

                  //   <div className="datesDiv datesBorder2">
                  //     <span className="route">Return</span>
                  //     <span className="dates">02 Jan 2024</span>
                  //   </div>
                  // </div>
                  <div className="DatePickerSmallScreen">
                    <div className="start-date">
                      <DatePicker
                        onChange={(value) =>
                          handleDepartureObj('startDate', value)
                        }
                        placeholder="Start Date"
                      />
                    </div>
                    <div className="end-date">
                      <DatePicker
                        onChange={(value) =>
                          handleDepartureObj('endDate', value)
                        }
                        placeholder="End Date"
                      />
                    </div>
                  </div>
                )}
              </Col>

              {screenSize.width > 768 && (
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
                      // open={open}
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
              )}

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
