import { Form, Input, Button, Collapse, Row, Col, Radio } from 'antd';
import { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './PassengerDetailsForm.scss';

const { Panel } = Collapse;

interface PassengerFormProps {
  passengerData: any;
  offerId: string;
  summaryData: any;
}

const PassengerDetailsForm: FC<PassengerFormProps> = ({
  passengerData = [],
  offerId,
  summaryData
}) => {
  const [currentForm, setCurrentForm] = useState(1);
  const [formValues, setFormValues] = useState<any>([]);
  const [passengerDataForSeatSelection, setPassengerDataForSeatSelection] =
    useState([]);
  const history = useHistory();
  const onFinish = (values, passengerId) => {
    setFormValues((prev) => [
      ...prev,
      {
        ...values,
        id: passengerId,
      },
    ]);
    setPassengerDataForSeatSelection((prev) => [
      ...prev,
      {
        id: passengerId,
        name: `${values.given_name} ${values.family_name}`,
      },
    ]);
  };

  const handleClick = () => {
    localStorage.setItem("passengerDetail", JSON.stringify({
      passengerDataForSeatSelection: passengerDataForSeatSelection,
      passengerInfo: formValues,
      selectedSlice: summaryData
    }))

    history.push(
      `/seat-selection/${offerId}`
    );
  };

  const passengerForms =
    passengerData?.length &&
    passengerData?.map((item, index) => {
      return (
        <Panel
          header={`Passenger ${index + 1}`}
          key={`passenger-${index + 1}`}
          className="active-form"
        >
          <Form
            onFinish={(values) => {
              onFinish(values, item.id);
              setCurrentForm(currentForm + 1);
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Row>
                  <h5>Title</h5>
                </Row>
                <div style={{ marginBottom: '15px' }}>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Please select passenger title!',
                      },
                    ]}
                  >
                    <Radio.Group>
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
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input passenger email!',
                    },
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                      message: 'Please select passenger phone number!',
                    },
                  ]}
                >
                  <Input
                    placeholder="enter passenger phone number"
                    type="text"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  name="given_name"
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
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  name="family_name"
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
            <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <Form.Item
                  name="born_on"
                  rules={[
                    {
                      required: true,
                      message: 'Please input passenger date of birth!',
                    },
                  ]}
                >
                  <Input placeholder="DD/MM/YYYY" type="date" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                <div>
                  <Form.Item
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'Please select passenger gender',
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Row className="radio-group">
                        <div className="radio-box">
                          <Radio value={'m'}>Male</Radio>
                        </div>
                        <div className="radio-box">
                          <Radio value={'f'}>Female</Radio>
                        </div>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row justify={'center'}>
              <Button
                type="primary"
                htmlType="submit"
                className="form-submit-button"
              >
                NEXT
              </Button>
            </Row>
          </Form>
        </Panel>
      );
    });

  return (
    <div className="passenger-details-form">
      <Collapse accordion activeKey={`passenger-${currentForm}`}>
        {passengerForms}
      </Collapse>
      <Row justify={'center'}>
        <Button
          type="primary"
          className={
            formValues?.length != passengerData?.length
              ? 'form-submit-button disabled'
              : 'form-submit-button'
          }
          onClick={handleClick}
          disabled={formValues?.length != passengerData?.length}
        >
          Select Seats
        </Button>
      </Row>
    </div>
  );
};
export default PassengerDetailsForm;
