import React from 'react';
import { Row, Col, Button } from 'antd';
import moment from "moment"

const FlightDetails = () => {
  return (<Row style={{ display: 'flex', width: '80vw', background: '#FFFF', height: '200px', borderRadius: '10px', marginTop: '20px' }} justify="space-between">
    <Col xs={24} sm={24} md={3} lg={3}>
      <img height={'100%'} width='100%' src="https://cssgradient.io/images/logo-55c31c59.svg" />
    </Col>
    <Col xs={24} sm={24} md={21} lg={21} style={{ padding: '20px' }}>
      <Row style={{ marginBottom: '30px' }}>
        <span>{moment.utc("02-02-2021").format("DD MMM YYYY")}</span>
        <span style={{ marginInline: '5px' }}>-</span>
        <span>{moment.utc("02-02-2021").format("DD MMM YYYY")}</span>
      </Row >
      <Row justify={'space-between'} style={{ marginBottom: '30px', borderBottom: '1px solid grey', paddingBottom: '10px' }}  >
        <Col xs={24} sm={12} md={2} lg={1} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Col xs={24} sm={24} md={20} lg={20} style={{ fontSize: '30px' }}>KHI</Col>
          <Col xs={24} sm={24} md={24} lg={24}>Karachi</Col>
        </Col>
        <Col xs={24} sm={12} md={4} lg={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> icon</Col>
        <Col xs={24} sm={12} md={5} lg={1}>
          <Col xs={24} sm={24} md={20} lg={20} style={{ fontSize: '30px' }}>KHI</Col>
          <Col xs={24} sm={24} md={24} lg={24}>Karachi</Col>
        </Col>
        <Row xs={24} sm={12} md={5} lg={8} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <span xs={24} sm={24} md={20} lg={20} >Return</span>
          <span xs={24} sm={24} md={24} lg={24} style={{ fontSize: '15px' }}>1 passenger</span>
        </Row>
        <Col xs={24} sm={12} md={6} lg={8} style={{ display: 'flex', justifyContent: 'end' }}>
          <Button

            type="default"
            htmlType="submit"
            className="form-button btnCompleteBooking"
          >
            Complete my Booking
          </Button>
        </Col>
      </Row >
      <Row justify={'space-evenly'}>
        <Col xs={24} sm={12} md={7} lg={7}>
          <Row>
            <span style={{ marginRight: '5px' }}>icon</span>
            <span>Why book with us</span>
          </Row>
        </Col>
        <Col xs={24} sm={12} md={7} lg={7}>
          <Row >
            <span style={{ marginRight: '5px' }}>icon</span>
            <span>Cancel with in 24 hours</span>
          </Row>
        </Col>
        <Col xs={24} sm={12} md={7} lg={7}>
          <Row>
            <span style={{ marginRight: '5px' }}>icon</span>
            <span>Voucher with 10% more</span>
          </Row>
        </Col>

      </Row>
    </Col>
  </Row>)
};

export default FlightDetails;
