import React from 'react';
import { Card, Row, Col, Divider } from 'antd';
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
  drawerData: any;
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
  drawerData,
}) => {
  return (
    <Card title="Your Trip Summary" className="main-card">
      <Col>
        <Row justify="space-between">
          <div>{departureDate}</div>
          <div>{arrivalDate}</div>
        </Row>
        <Row justify="space-between" className="red-head">
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

      {/* <Col style={{ marginTop: '20px' }}>
        <Row justify="space-between">
          <div>{departureDate}</div>
          <div>{arrivalDate}</div>
        </Row>
        <Row justify="space-between" className="red-head">
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
      </Col> */}
      <Divider />
      <Row justify="space-between">
        <div>Total Trip Price:</div>
        <div className="card-bottom-title red-head">{TotalExpense}.00 PKR</div>
      </Row>
    </Card>
  );
};

export default FlightSummary;
