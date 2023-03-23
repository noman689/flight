import React from 'react';
import { Card, Row, Col, Timeline, Divider } from 'antd';
import './PassengerDetailsPage.scss';
interface FlightSummaryProps {
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  durationHour: number;
  durationMin: number;
  departureDate: string;
  arrivalDate: string;
  TotalExpense: number;
}

const FlightSummary: React.FC<FlightSummaryProps> = ({
  departureCity,
  arrivalCity,
  departureTime,
  arrivalTime,
  durationHour,
  durationMin,
  departureDate,
  arrivalDate,
  TotalExpense,
}) => {
  return (
    <Card
      title="Your Trip Summary"
      style={{
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        margin: '17px 0',
        textAlign: 'center',
      }}
    >
      <Col>
        <Row justify="space-between">
          <div>{departureDate}</div>
          <div>{arrivalDate}</div>
        </Row>
        <Row justify="space-between">
          <div>{departureTime}</div>
          <div>{arrivalTime}</div>
        </Row>
        <Row className="indicators">
          <div>
            {durationHour}h {durationMin}m
          </div>
          <span className="pathway">
            <span className="point" />
          </span>
        </Row>
        <Row justify="space-between">
          <div>{departureCity}</div>
          <div>{arrivalCity}</div>
        </Row>
      </Col>

      <Col style={{ marginTop: '20px' }}>
        <Row justify="space-between">
          <div>{departureDate}</div>
          <div>{arrivalDate}</div>
        </Row>
        <Row justify="space-between">
          <div>{departureTime}</div>
          <div>{arrivalTime}</div>
        </Row>
        <Row className="indicators">
          <div>
            {durationHour}h {durationMin}m
          </div>
          <span className="pathway">
            <span className="point" />
          </span>
        </Row>
        <Row justify="space-between">
          <div>{departureCity}</div>
          <div>{arrivalCity}</div>
        </Row>
      </Col>
      <Divider />
      <Row justify="space-between">
        <div className="card-bottom-title">Total Trip Price:</div>
        <div className="card-bottom-title">{TotalExpense}.00 PKR</div>
      </Row>
    </Card>
  );
};

export default FlightSummary;
