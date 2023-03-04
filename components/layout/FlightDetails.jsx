import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import moment from "moment"
import {
  ArrowRightOutlined,
  MobileOutlined,
  MinusCircleOutlined,
  DiffOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import './FlightDetails.scss';

const FlightDetails = ({ fromDate = "02-02-2021", toDate = "03-02-2021", departure = "Karachi", departureSub = "KTC", destination = "Lahore", destinationSub = "Lhr", plan = "1 passenger", type = "Return", departureImg = "https://source.unsplash.com/1600x900/?lahore" }) => {
  const [passengersCount, setPassengersCount] = useState()

  useEffect(() => {
    const count = {};
    if (plan) {
      plan.forEach((obj) => {
        if (obj && obj.type) {
          if (count[obj.type]) {
            count[obj.type]++;
          } else {
            count[obj.type] = 1;
          }
        }
      });
      console.log(count)
      count && setPassengersCount(count)
    }

  }, [plan])

  return (

    <Row className="flightDetails" justify="space-between">
      <Col xs={24} sm={24} md={24} lg={3}>
        <img height={'100%'} width='100%' src={departureImg} className="imageCover" />
      </Col>
      <Col xs={24} sm={24} md={21} lg={21} style={{ padding: '20px' }}>
        <Row style={{ marginBottom: '30px' }}>
          <span>{moment.utc(fromDate).format("DD MMM YYYY")}</span>
          <span style={{ marginInline: '5px' }}>-</span>
          <span>{moment.utc(toDate).format("DD MMM YYYY")}</span>
        </Row >
        <Row justify={'space-between'} className="departureCard"  >
          <Col xs={8} sm={12} md={2} lg={2} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Col xs={24} sm={24} md={20} lg={20} style={{ fontSize: '30px', fontWeight: '500' }}>{departureSub}</Col>
            <Col xs={24} sm={24} md={24} lg={24}>{departure}</Col>
          </Col>
          <Col xs={4} sm={12} md={4} lg={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>  <ArrowRightOutlined /> </Col>
          <Col xs={8} sm={12} md={5} lg={2}>
            <Col xs={24} sm={24} md={20} lg={20} style={{ fontSize: '30px', fontWeight: '500' }}>{destinationSub}</Col>
            <Col xs={24} sm={24} md={24} lg={24}>{destination}</Col>
          </Col>
          <Row xs={24} sm={24} md={5} lg={8} className="planStyling" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <span xs={10} sm={10} md={20} lg={20} >{type}</span>
            <span xs={12} sm={12} md={24} lg={24} style={{ fontSize: '15px' }}>{
              passengersCount && Object.keys(passengersCount).map((key) => (
                <span key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                  {passengersCount[key]}
                </span>
              ))
            }</span>
          </Row>
          <Col xs={24} sm={24} md={6} lg={8} style={{ display: 'flex', justifyContent: 'end' }}>
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
          <Col xs={0} sm={12} md={7} lg={7}>
            <div style={{ display: 'flex', alignItems: 'center' }} >
              <span style={{ marginRight: '5px', fontSize: '20px', color: '#652954' }}>  <MobileOutlined /></span>
              <span>Voucher with 10% more</span>
            </div>
          </Col>
          <Col xs={0} sm={12} md={7} lg={7}>

            <div style={{ display: 'flex', alignItems: 'center' }} >
              <span style={{ marginRight: '5px', fontSize: '20px', color: '#652954' }}>  < MinusCircleOutlined /></span>
              <span>Voucher with 10% more</span>
            </div>

          </Col>
          <Col xs={0} sm={12} md={7} lg={7}>
            <div style={{ display: 'flex', alignItems: 'center' }} >
              <span style={{ marginRight: '5px', fontSize: '20px', color: '#652954' }}>  <DiffOutlined /></span>
              <span>Voucher with 10% more</span>
            </div>

          </Col>
        </Row>
      </Col >
    </Row >)
};

export default FlightDetails;
