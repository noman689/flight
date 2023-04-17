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
  Radio,
  Slider,
} from 'antd';
import { DownOutlined } from "@ant-design/icons"
import './NewFlightSearchForm.scss';
import { useHistory } from 'react-router-dom';
import { searchFlightAPI } from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
// @ts-ignore
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
  const [departureVisibility, setDepartureVisibility] = useState(false)
  const [returnVisibility, setReturnVisibility] = useState(false)

  const [passengersObj, setPassengersObj] = useState({
    adult: 1,
    child: 0,
  });
  const [cabinClassValue, setCabinClassValue] = useState<any>('economy');
  // const ticketType = [{ value: 'One Way' }, { value: 'return' }];
  const [ticketType, setTicketType] = useState('one way')
  const [hideFilter, setHideFilter] = useState(false);
  const [adult, setAdult] = useState(1)
  const [children, setChildren] = useState(0)
  const cabinClass = [
    { label: 'Economy', value: 'economy' },
    { label: 'Premium Economy', value: 'premium_economy' },
    { label: 'Business', value: 'business' },
    { label: 'First', value: 'first' },
    { label: 'Any', value: 'any' },
  ];

  const airlines = [
    { label: 'Fly Dubai', value: '1' },
    { label: 'Fly Emirates', value: '2' },
    { label: 'PIA', value: '3' },
    { label: 'Blue Airline', value: '4' },
    { label: 'Sky Ways', value: '5' },
    { label: 'Qatar Airways', value: '6' },
  ];


  const onFinish = async (values) => {
    console.log(values, 'Values');
    const { adult, child } = passengersObj;
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

  function handleCount(type: string, method: string) {
    if (method === 'add') {
      type === "adult" ? setAdult(adult + 1) : setChildren(children + 1)
    }
    else {
      if (type === "adult" && adult > 0) {
        setAdult(adult - 1)
      }
      else if (children > 0) { setChildren(children - 1) }

    }
  }
  return (
    <>
      <div className="flight-search-form">
        <div className="paddingLR">
          <Form onFinish={onFinish} form={form} layout="vertical">


            <Row className="MainRow">
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  label="Trip Type"
                  name="travelType"
                  rules={[
                    {
                      required: true,
                      message: 'Select Travel Type',
                    },
                  ]}
                >
                  <Radio.Group onChange={(e) => setTicketType(e.target.value)} value={ticketType} defaultValue={ticketType}>
                    <Radio value="one way" >
                      <span className="radioHeading">One Way</span>
                    </Radio>
                    <Radio value="return">
                      <span className="radioHeading">Return</span>
                    </Radio>
                    <Radio value="multi-city">
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
              {ticketType === "return" ?
                <>
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
                      open={departureVisibility}
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
                            <Button className="btnConfirm" onClick={() => setDepartureVisibility(false)}>Confirm</Button>
                          </div>
                        </div>
                      }
                    >
                      <div style={{ marginBottom: '30px', borderRadius: '20px', display: 'flex' }}>
                        <span className="btnAnyTime" onClick={() => setDepartureVisibility(!departureVisibility)}>At any time</span>
                        <span style={{ color: '#985eaf' }}><DownOutlined /></span>
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
                      open={returnVisibility}
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
                            <Button className="btnConfirm" onClick={() => setReturnVisibility(false)}
                            >Confirm</Button>
                          </div>
                        </div>
                      }
                    >
                      <div style={{ marginBottom: '30px', borderRadius: '20px', display: 'flex' }}>
                        <span className="btnAnyTime" onClick={() => setReturnVisibility(!returnVisibility)}>At any time</span>
                        <span style={{ color: '#985eaf' }}><DownOutlined /></span>
                      </div>
                    </Popover>
                  </Col>
                </>

                :
                <Col xs={24} sm={24} md={24} lg={24}>
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
                  <Col xs={24} sm={24} md={14} lg={14}>
                    <Popover
                      open={departureVisibility}
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
                            <Button className="btnConfirm" onClick={() => setDepartureVisibility(false)}>Confirm</Button>
                          </div>
                        </div>
                      }
                    >

                    </Popover>
                    <div style={{ marginBottom: '30px', borderRadius: '20px', display: 'flex' }}>
                      <span className="btnAnyTime" onClick={() => setDepartureVisibility(!departureVisibility)}>At any time</span>
                      <span style={{ color: '#985eaf' }}><DownOutlined /></span>
                    </div>
                  </Col>
                </Col>
              }
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
                      <>
                        <div style={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                          <div style={{ marginRight: '30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span className="fontSize20">Adults</span>
                            <span className="">18+</span>
                          </div>
                          <Row align={'middle'}>
                            <Button onClick={() => handleCount("adult", "subtract")} style={{ background: 'gray' }}>
                              <span style={{ color: 'white', fontSize: '16px' }}>-</span>

                            </Button>

                            <div style={{ minWidth: '20px' }}>
                              <span style={{ marginInline: '10px', }}>{adult}</span>
                            </div>
                            <Button onClick={() => handleCount("adult", "add")} style={{ background: 'black' }}>
                              <span style={{ color: 'white', fontSize: '16px' }}>+</span>

                            </Button>
                          </Row>
                        </div>

                        <div style={{ padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ marginRight: '30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <div style={{ minWidth: '20px' }}>
                              <span className="fontSize20">Children</span>
                            </div>
                            <span className="">0--17</span>
                          </div>
                          <Row align={'middle'}>
                            <Button onClick={() => handleCount("children", "subtract")} style={{ background: 'gray' }}>
                              <span style={{ color: 'white', fontSize: '16px' }}>-</span>

                            </Button>

                            <span style={{ marginInline: '10px' }}>{children}</span>
                            <Button onClick={() => handleCount("children", "add")} style={{ background: 'black' }}>
                              <span style={{ color: 'white', fontSize: '16px' }}>+</span>
                            </Button>
                          </Row>
                        </div>
                      </>

                    }
                    onOpenChange={handleOpenChange}
                  >
                    <Form.Item label="Passanger">
                      <Input
                        name="passenger"
                        key={`passenger:${passengersObj}`}
                        readOnly={true}
                        value={` Adult: ${adult} And Children ${children}  `}
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
                  label="Class"
                  name="class"
                  rules={[
                    {
                      required: true,
                      message: 'Select Class Type',
                    },
                  ]}
                  initialValue={cabinClassValue}
                >
                  <Select
                    className="autoCompletegeneral"
                    style={{ width: '100%' }}
                    placeholder="Select Class Type"
                    onChange={(value) => setCabinClassValue(value)}

                    filterOption={false}
                    value={cabinClassValue}

                  >
                    {cabinClass?.map((item, index) => {
                      return (
                        <Select.Option value={item.value} key={index}>
                          {item.label}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} className="dflexFlexEnd" >
                <span
                  className="fontSize padding-right10 advance-link"
                  onClick={() => {
                    setHideFilter(!hideFilter);
                  }}
                >
                  Advance options
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
                    {airlines?.map((item, index) => {
                      return (
                        <Select.Option value={item.value} key={index}>
                          {item.label}
                        </Select.Option>
                      );
                    })}

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
            </Row >
          </Form >
        </div >
      </div >
    </>
  );
};

export default NewFlightSearchForm;
