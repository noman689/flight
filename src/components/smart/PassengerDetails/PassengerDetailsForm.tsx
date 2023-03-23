import { Form, Input, Button, Collapse, Select, Row, Col, Radio } from 'antd';
import { FC, useState, useMemo } from 'react';
import './PassengerDetailsForm.scss';

const { Panel } = Collapse;
const { Option } = Select;

interface PassengerFormProps {
  numberOfPassengers: number;
}

const PassengerDetailsForm: FC<PassengerFormProps> = ({
  numberOfPassengers,
}) => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formValues, setFormValues] = useState<any>({});
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const handleTitleChange = (value) => {
    if (['mrs', 'ms'].includes(value)) {
      setGender('female');
    } else {
      setGender('male');
    }
    setTitle(value);
  };

  const handleGenderChange = (genderItem) => {
    if (genderItem == 'female') {
      setTitle('ms');
    } else {
      setTitle('mr');
    }
    setGender(genderItem);
  };

  const passengerForms = useMemo(
    () =>
      Array.from({ length: numberOfPassengers }, (_, i) => (
        <Panel
          header={`Passenger ${i + 1}`}
          key={`passenger-${i + 1}`}
          className={currentForm === i + 1 ? 'active-form' : ''}
        >
          <Form
            initialValues={formValues}
            onFinish={(values) => {
              console.log('Form submitted:', values);
              setFormValues({ ...formValues, ...values });
              setCurrentForm(currentForm + 1);
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Row>
                  <h5>Title</h5>
                </Row>
                <div style={{ marginBottom: '15px' }}>
                  <Radio.Group
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                  >
                    <Row className="radio-group">
                      <div className="radio-box">
                        <Radio value={'mr'}>Mr</Radio>
                      </div>
                      <div className="radio-box">
                        <Radio value={'mrs'}>Mrs</Radio>
                      </div>
                      <div className="radio-box">
                        <Radio value={'ms'}>Ms</Radio>
                      </div>
                      <div className="radio-box">
                        <Radio value={'sheikh'}>Sheikh</Radio>
                      </div>
                      <div className="radio-box">
                        <Radio value={'sheikha'}>Sheikha</Radio>
                      </div>
                    </Row>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  name={`firstName${i + 1}`}
                  rules={[
                    {
                      required: true,
                      message: 'Please input passenger first name!',
                    },
                  ]}
                >
                  <Input placeholder="First Name / Middle Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  name={`lastName${i + 1}`}
                  rules={[
                    {
                      required: true,
                      message: 'Please input passenger last name!',
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  name={`dob${i + 1}`}
                  rules={[
                    {
                      required: true,
                      message: 'Please input passenger date of birth!',
                    },
                  ]}
                >
                  <Input placeholder="DD/MM/YYYY" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  name={`nationality${i + 1}`}
                  rules={[
                    {
                      required: true,
                      message: 'Please select passenger nationality!',
                    },
                  ]}
                >
                  <Select placeholder="Nationality">
                    <Option value="US">United States</Option>
                    <Option value="CA">Canada</Option>
                    <Option value="MX">Mexico</Option>
                    <Option value="GB">United Kingdom</Option>
                    <Option value="AU">Australia</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
              <Col span={12}>
                <div>
                  <Radio.Group
                    value={gender}
                    onChange={(e) => handleGenderChange(e.target.value)}
                  >
                    <Row className="radio-group">
                      <div className="radio-box">
                        <Radio value={'male'}>Male</Radio>
                      </div>
                      <div className="radio-box">
                        <Radio value={'female'}>Female</Radio>
                      </div>
                    </Row>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
            <Row>
              <h5>Passport Details</h5>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item name="passportNumber">
                  <Input placeholder="Passport Number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item name="passportExpiryDate">
                  <Input placeholder="Passport Expiry Date (DD/MM/YYYY)" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <h5>Travel Documents (Optional)</h5>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  name={`docuType${i + 1}`}
                  rules={[
                    {
                      message: 'Please Select Travel Document Type',
                    },
                  ]}
                >
                  <Select placeholder="Travel Document Type">
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                    <Option value="3">Option 3</Option>
                    <Option value="4">Option 4</Option>
                    <Option value="5">Option 5 </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  name={`country${i + 1}`}
                  rules={[
                    {
                      message: 'Please select Country!',
                    },
                  ]}
                >
                  <Select placeholder="Select Country">
                    <Option value="US">United States</Option>
                    <Option value="CA">Canada</Option>
                    <Option value="MX">Mexico</Option>
                    <Option value="GB">United Kingdom</Option>
                    <Option value="AU">Australia</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              SUBMIT
            </Button>

            {/* <Form.Item>
              {currentForm >= i + 1 && (
                <Button type="primary" htmlType="submit">
                  {currentForm === numberOfPassengers ? 'Finish' : 'Next'}
                </Button>
              )}
            </Form.Item> */}
          </Form>
        </Panel>
      )),
    [numberOfPassengers, currentForm, formValues],
  );

  return (
    <div className="passenger-details-form">
      <Collapse
        accordion
        // activeKey={`passenger-${currentForm}`}
        onChange={(key) => {
          setCurrentForm(Number(key.slice(-1)));
        }}
      >
        {passengerForms}
      </Collapse>
    </div>
  );
};
export default PassengerDetailsForm;
