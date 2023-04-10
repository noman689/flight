import React from 'react';
import { Card, Row, Col, Divider } from 'antd';
import './PassengerDetailsPage.scss';
import moment from 'moment';
interface FlightSummaryProps {
  summaryData: any;
  fare: string;
}

const FlightSummary: React.FC<FlightSummaryProps> = ({ summaryData, fare }) => {
  console.log('summaryData', summaryData);
  return (
    <Card title="Your Trip Summary" className="main-card">
      {summaryData?.segments?.length &&
        summaryData?.segments?.map((item) => {
          return (
            <Col>
              <Row justify="space-between">
                <div>{moment(item?.departing_at).format('DD-MM-YYYY')}</div>
                <div>{moment(item?.arriving_at).format('DD-MM-YYYY')}</div>
              </Row>
              <Row justify="space-between" className="red-head">
                <div>{moment(item?.departing_at).format('hh:mm A')}</div>
                <div>{moment(item?.arriving_at).format('hh:mm A')}</div>
              </Row>
              <Row className="indicators">
                <div>
                  {item?.duration?.slice(2).split('H')[0]}h{' '}
                  {item?.duration?.slice(2).split('H')[1].split('M')[0]}m
                </div>
                <span className="pathway">
                  <span className="point" />
                </span>
              </Row>
              <Row justify="space-between">
                <div>{item?.origin?.city_name}</div>
                <div>{item?.destination?.city_name}</div>
              </Row>
            </Col>
          );
        })}
      <Divider />
      <Row justify="space-between">
        <div>Total Trip Price:</div>
        <div className="card-bottom-title red-head">${fare}</div>
      </Row>
    </Card>
  );
};

export default FlightSummary;
