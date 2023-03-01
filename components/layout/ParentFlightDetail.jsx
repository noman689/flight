import { Col, Row } from 'antd';
import React from 'react';
import FlightDetails from './FlightDetails';
const ParentFlightDetail = () => {
  const flightDetailsObj = [
    {
      fromDate: '2022-05-01',
      toDate: '2022-05-10',
      departure: 'New York City',
      departureSub: 'JFK',
      departureImg: 'https://source.unsplash.com/1600x900/?new-york-city',
      destination: 'Los Angeles',
      destinationSub: 'LAX',
      destinationImg: 'https://source.unsplash.com/1600x900/?los-angeles',
      plan: '2 passengers',
      type: 'Round-trip',
    },
    {
      fromDate: '2022-06-15',
      toDate: '2022-06-20',
      departure: 'Paris',
      departureSub: 'CDG',
      departureImg: 'https://source.unsplash.com/1600x900/?paris',
      destination: 'Rome',
      destinationSub: 'FCO',
      destinationImg: 'https://source.unsplash.com/1600x900/?rome',
      plan: '1 passenger',
      type: 'One-way',
    },
    {
      fromDate: '2022-07-04',
      toDate: '2022-07-12',
      departure: 'Tokyo',
      departureSub: 'HND',
      departureImg: 'https://source.unsplash.com/1600x900/?tokyo',
      destination: 'Seoul',
      destinationSub: 'ICN',
      destinationImg: 'https://source.unsplash.com/1600x900/?seoul',
      plan: '3 passengers',
      type: 'Round-trip',
    },
    {
      fromDate: '2022-08-20',
      toDate: '2022-08-30',
      departure: 'Sydney',
      departureSub: 'SYD',
      departureImg: 'https://source.unsplash.com/1600x900/?sydney',
      destination: 'Melbourne',
      destinationSub: 'MEL',
      destinationImg: 'https://source.unsplash.com/1600x900/?melbourne',
      plan: '1 passenger',
      type: 'Round-trip',
    },
    {
      fromDate: '2022-09-05',
      toDate: '2022-09-10',
      departure: 'Dubai',
      departureSub: 'DXB',
      departureImg: 'https://source.unsplash.com/1600x900/?dubai',
      destination: 'Abu Dhabi',
      destinationSub: 'AUH',
      destinationImg: 'https://source.unsplash.com/1600x900/?abu-dhabi',
      plan: '2 passengers',
      type: 'One-way',
    },
    {
      fromDate: '2022-10-18',
      toDate: '2022-10-25',
      departure: 'London',
      departureSub: 'LHR',
      departureImg: 'https://source.unsplash.com/1600x900/?london',
      destination: 'Edinburgh',
      destinationSub: 'EDI',
      destinationImg: 'https://source.unsplash.com/1600x900/?edinburgh',
      plan: '4 passengers',
      type: 'Round-trip',
    },
  ];

  return (
    <div className="main_page_width">
      <Row justify="center">
        {flightDetailsObj.map((value, index) => (
          <FlightDetails
            fromDate={value.fromDate}
            toDate={value.toDate}
            departure={value.departure}
            departureSub={value.departureSub}
            destination={value.destination}
            destinationSub={value.destinationSub}
            plan={value.plan}
            type={value.type}
            departureImg={value.departureImg}
          ></FlightDetails>
        ))}
      </Row>
    </div>
  );
};

export default ParentFlightDetail;
