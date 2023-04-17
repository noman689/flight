import { useState, useEffect } from 'react';
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
  Slider,
} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import dayjs from 'dayjs';
import './NewFlightSearchForm.scss';
import { Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { searchFlightAPI } from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
// @ts-ignore
import { useDispatch } from 'react-redux';
import { searchPlacesAPI } from '@client/services/searchPlacesServices';

interface FlightSearchFormProps {
  isStickyNav?: boolean;
}

const NewFlightSearchForm = ({
  isStickyNav = false,
}: FlightSearchFormProps) => {
  const history = useHistory();
  const [form] = Form.useForm();
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
  const ticketType = [{ value: 'One Way' }, { value: 'return' }];
  const [hideFilter, setHideFilter] = useState(false);

  const cabinClass = [
    { label: 'Economy', value: 'economy' },
    { label: 'Premium(Business/First)', value: 'business' },
  ];

  const onFinish = async (values) => {
    console.log(values, 'Values');
    const { adult, child, infant } = passengersObj;
    const passengers = [
      ...[...new Array(adult)].map((item) => {
        return { type: 'adult' };
      }),
      ...[...new Array(infant)].map((item) => {
        return { type: 'infant_without_seat' };
      }),
      ...[...new Array(child)].map((item) => {
        return { type: 'child' };
      }),
    ];
    const payload = {
      origin: values.origin,
      destination: values.destination,
      departure_date:
        window.innerWidth < 821
          ? values.departure_date?.toISOString()
          : values.departure_date[0]?.toISOString(),
      return_date:
        window.innerWidth < 821
          ? values.return_date?.toISOString()
          : values.departure_date[1]?.toISOString(),
      cabin_class: cabinClassValue,
      passengers: passengers,
      return_offer: values.travelType == 'return' ? true : false,
    };
    try {
      setIsLoading(true);
      const response = await searchFlightAPI(payload);
      setIsLoading(false);
      history.push(`/flight-details/${response.data?.offer_id}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
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

  const [value, setValue] = useState(1);
  const { Option } = Select;

  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (values) => {
    setSelectedValues(values);
  };

  console.log(selectedValues, 'selectedValues');

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <div className="flight-search-form">
        <div className="paddingLR">
          <Form onFinish={onFinish} form={form} layout="vertical">
            

            <Row className="MainRow">
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  name="travelType"
                  rules={[
                    {
                      required: true,
                      message: 'Select Travel Type',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value={'one way'}>
                      <span className="radioHeading">One Way</span>
                    </Radio>
                    <Radio value={'return'}>
                      <span className="radioHeading">Return</span>
                    </Radio>
                    <Radio value={'multi-city'}>
                      <span className="radioHeading">Multi City</span>
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Row gutter={[8, 0]} style={{ width: '100%' }}>
                {/* <Col xs={24} sm={24} md={24} lg={24} className="space-around"> */}
                <Col xs={24} sm={24} md={24} lg={12}>
                  <Form.Item
                    label="Origin"
                    name="origin"
                    rules={[
                      {
                        required: true,
                        message: 'Search Departure city',
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      showSearch
                      className="autoCompletegeneral"
                      style={{ width: '100%' }}
                      placeholder="Search Departure City"
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
                <Col xs={24} sm={24} md={24} lg={12}>
                  <Form.Item
                    label="Destination"
                    name="destination"
                    rules={[
                      {
                        required: true,
                        message: 'Search destination city',
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Search Arrival City"
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
                {/* </Col> */}
              </Row>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="departure_date"
                  rules={[
                    {
                      required: true,
                      message: 'Select departure date',
                    },
                  ]}
                  label="Departure Date"
                  className="form-input"
                >
                  <DatePicker
                    style={{ width: '99%', padding: '14px' }}
                    onChange={onChange}
                  />
                </Form.Item>
                <Popover
                  placement={`bottom`}
                  trigger="click"
                  content={
                    <div style={{ width: '280px' }}>
                      <div>
                        <span>
                          <img
                            className="planeLogo"
                            src="https://www.svgrepo.com/show/57834/takeoff-the-plane.svg"
                          />
                          Take Off
                        </span>
                        <Slider
                          min={0}
                          max={23}
                          range={{ draggableTrack: true }}
                          defaultValue={[0, 23]}
                        />
                      </div>
                      <br />
                      <div>
                        <span>
                          <img
                            className="planeLogo"
                            src="https://www.svgrepo.com/show/122269/plane-landing.svg"
                          />
                          Landing
                        </span>
                        <Slider
                          min={0}
                          max={23}
                          range={{ draggableTrack: true }}
                          defaultValue={[0, 23]}
                        />
                      </div>
                      <div className="dflexFlexEnd">
                        <Button className="btnConfirm">Confirm</Button>
                      </div>
                    </div>
                  }
                >
                  <div style={{ marginBottom: '30px', borderRadius: '20px' }}>
                    <Button className="btnAnyTime">At any time</Button>
                  </div>
                </Popover>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  label="Return Date"
                  name="return_date"
                  className="form-input popover-anyTime"
                  rules={[
                    {
                      required: true,
                      message: 'Select Return date',
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: '99%', padding: '14px' }}
                    onChange={onChange}
                  />
                </Form.Item>
                <Popover
                  placement={`bottom`}
                  trigger="click"
                  content={
                    <div style={{ width: '280px' }}>
                      <div>
                        <span>
                          <img
                            className="planeLogo"
                            src="https://www.svgrepo.com/show/57834/takeoff-the-plane.svg"
                          />
                          Take Off
                        </span>
                        <Slider
                          min={0}
                          max={23}
                          range={{ draggableTrack: true }}
                          defaultValue={[0, 23]}
                        />
                      </div>
                      <br />
                      <div>
                        <span>
                          <img
                            className="planeLogo"
                            src="https://www.svgrepo.com/show/122269/plane-landing.svg"
                          />
                          Landing
                        </span>
                        <Slider
                          min={0}
                          max={23}
                          range={{ draggableTrack: true }}
                          defaultValue={[0, 23]}
                        />
                      </div>
                      <div className="dflexFlexEnd">
                        <Button className="btnConfirm">Confirm</Button>
                      </div>
                    </div>
                  }
                >
                  <div style={{ marginBottom: '30px', borderRadius: '20px' }}>
                    <Button className="btnAnyTime">At any time</Button>
                  </div>
                </Popover>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
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
                    placement={`bottom`}
                    trigger="click"
                    content={
                      <div style={{ padding: '15px' }}>
                        <div>
                          <span className="fontSize20">Passengers (18+)</span>
                        </div>
                        <div style={{ marginTop: '10px', width: '100%' }}>
                          <div className="dflex">
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
                        </div>
                      </div>
                    }
                    onOpenChange={handleOpenChange}
                  >
                    <Form.Item label="Passanger">
                      <Input
                        name="passenger"
                        key={`passenger:${passengersObj}`}
                        readOnly={true}
                        value={` Adult: ${passengersObj.adult}  `}
                        style={{
                          borderRadius: '8px',
                          width: '99%',
                          padding: '14px',
                        }}
                        placeholder="Enter passengers & class"
                        className="form-input"
                        onClick={() => {
                          setOpen(!open);
                        }}
                      />
                    </Form.Item>
                  </Popover>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="passengers-class"
                  rules={[
                    {
                      required: false,
                      message: 'Please Enter passengers',
                    },
                  ]}
                >
                  <Popover
                    placement={`bottom`}
                    trigger="click"
                    content={
                      <div style={{ padding: '15px' }}>
                        <div>
                          <span className="fontSize20">Class</span>
                        </div>
                        <div style={{ marginTop: '10px', width: '100%' }}>
                          <div className="dflex">
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
                      </div>
                    }
                    onOpenChange={handleOpenChange}
                  >
                    <Form.Item label="Class">
                      <Input
                        name="class"
                        key={`class:${cabinClassValue}`}
                        readOnly={true}
                        value={` class: ${cabinClassValue}  `}
                        style={{
                          borderRadius: '8px',
                          width: '99%',
                          padding: '14px',
                        }}
                        placeholder=" class"
                        className="form-input"
                        onClick={() => {
                          setOpen(!open);
                        }}
                      />
                    </Form.Item>
                  </Popover>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} className="dflexFlexEnd">
                <span
                  className="fontSize padding-right10"
                  onClick={() => {
                    setHideFilter(!hideFilter);
                  }}
                >
                  Advance Search Button
                </span>
              </Col>

              {hideFilter && (
                <Col xs={24} sm={24} md={24} lg={24} className="Airline">
                  <Select
                    mode="multiple"
                    placeholder="Select Airline Companies"
                    onChange={handleChange}
                    value={selectedValues}
                  >
                    <Option value="1">Fly Dubai</Option>
                    <Option value="2">Fly Emirates</Option>
                    <Option value="3">PIA</Option>
                    <Option value="4">Blue Airline</Option>
                    <Option value="5">Sky Ways</Option>
                    <Option value="6">Qatar Airways</Option>
                    {/* Add more options as needed */}
                  </Select>
                </Col>
              )}

              <Col xs={24} sm={24} md={24} lg={24} className="centerBtn">
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

export default NewFlightSearchForm;
