import React from 'react';
import { Row, Col, Card } from 'antd';
import PassengerDetailsForm from './PassengerDetailsForm';
import './PassengerDetailsPage.scss';
import FlightSummary from './FlightSummary';
import { useSelector } from 'react-redux';

const PassengerDetailsPage: React.FC = (drawerData) => {
  const handleFinish = () => {};
  // @ts-ignore

  const offerData = useSelector((state) => state.app.offer);
  console.log('design:', offerData);
  return (
    <div className="passenger-details-page-layout">
      <div className="form-section">
        <PassengerDetailsForm
          numberOfPassengers={
            4
            // offerData.segments[0].passengers.length
          }
        />
      </div>
      <div className="summary-section">
        <FlightSummary
          drawerData={drawerData}
          departureCity={offerData.segments[0].destination.iata_city_code}
          arrivalCity={offerData.segments[0].origin.iata_city_code}
          departureDate={offerData.segments[0].departing_at}
          arrivalDate={offerData.segments[0].arriving_at}
          departureTime={offerData.segments[0].departing_at}
          arrivalTime={offerData.segments[0].arriving_at}
          durationHour={8}
          durationMin={40}
          TotalExpense={8752400}
        />
      </div>
    </div>
  );
};

export default PassengerDetailsPage;
