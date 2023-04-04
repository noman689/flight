import React from 'react';
import { Row, Col, Card } from 'antd';
import PassengerDetailsForm from './PassengerDetailsForm';
import './PassengerDetailsPage.scss';
import FlightSummary from './FlightSummary';
import { useSelector } from 'react-redux';
const PassengerDetailsPage: React.FC = () => {
  const handleFinish = () => {};
  // @ts-ignore
  const offerData = useSelector((state) => state.app.offer);
  console.log('design:', offerData);
  return (
    <div className="passenger-details-page-layout">
      <div className="form-section">
        <PassengerDetailsForm
          numberOfPassengers={offerData.segments[0].passengers.length}
        />
      </div>
      <div className="summary-section">
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
      </div>
    </div>
  );
};

export default PassengerDetailsPage;
