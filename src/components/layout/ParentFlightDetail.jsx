import { Col, Row } from 'antd';
import React from 'react';
import FlightDetails from './FlightDetails';
const { isEmpty } = require('lodash');

const ParentFlightDetail = ({ apiData }) => {

  return (
    <div className="main_page_width">
      <Row justify="center">
        {apiData.map((value, index) => (
          <FlightDetails
            fromDate={value.data.slices[0].departure_date}
            toDate={value.data.slices[1].departure_date}
            departure={value.data.slices[0].origin.name}
            departureSub={value.data.slices[0].origin.iata_code}
            destination={value.data.slices[0].destination.name}
            destinationSub={value.data.slices[0].destination.iata_code}
            plan={value.data.passengers}
            type={value.cabin_class}
            departureImg={`https://source.unsplash.com/1600x900/?${value.data.slices[0].origin.name}`}
          ></FlightDetails>
        ))}
      </Row>
    </div >
  );
};

export default ParentFlightDetail;
