import React from 'react';
import { Row, Col, Card } from 'antd';
import PassengerDetailsForm from './PassengerDetailsForm';
import './PassengerDetailsPage.scss';
import FlightSummary from './FlightSummary';
const PassengerDetailsPage: React.FC = () => {
  const handleFinish = () => {};

  return (
    <Row className="passenger-details-page-layout">
      <Col xs={24} lg={18}>
        <PassengerDetailsForm numberOfPassengers={2} />
      </Col>
      <Col xs={24} lg={6} style={{ paddingLeft: '22px' }}>
        <FlightSummary
          departureCity="ISB"
          arrivalCity="DOH"
          departureDate="Fri, 10 Mar"
          arrivalDate="Fri, 10 Mar"
          departureTime="06:15"
          arrivalTime="08:30"
          durationHour={8}
          durationMin={40}
          TotalExpense={8752400}
        />
      </Col>
    </Row>
  );
};

export default PassengerDetailsPage;
