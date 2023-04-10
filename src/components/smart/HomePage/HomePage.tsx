import React from 'react';
import SearchFlightCard from '../BookingCard/BookingCard';
import DestinationsFlicker from '../DestinationsFlicker/DestinationsFlicker';
import DisplayCards from '../DisplayCards/DisplayCards';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="content-section">
      <SearchFlightCard />
      <DisplayCards />
      <DestinationsFlicker />
    </div>
  );
};

export default HomePage;
