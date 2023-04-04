import Spin from '@client/components/presentational/Spin';
import { getFlightOffersAPI } from '@client/services/searchFlightService';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FlightDetailCard from '../FlightDetailCard/FlightDetailCard';

const FlightDetail = () => {
  const [offersArray, setOffersArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const getOfers = async () => {
      try {
        setLoading(true);
        const data = await getFlightOffersAPI(id);
        setOffersArray(data.data?.offer?.slices);
        setLoading(false);
      } catch (e) {
        console.log('error', e);
        setLoading(false);
      }
    };
    getOfers();
  }, [id]);

  return (
    <div className="main_page_width m-b-30">
      {loading ? (
        <Spin />
      ) : (
        <Row justify="center">
          {offersArray.map((value, index) => (
            <FlightDetailCard
              fromDate={value.departure_date}
              toDate={value.departure_date}
              departure={value.origin.name}
              departureSub={value.origin.iata_code}
              destination={value.destination.name}
              destinationSub={value.destination.iata_code}
              // plan={value.data.passengers}
              type={value.cabin_class}
              departureImg={`https://source.unsplash.com/1600x900/?${value.origin.name}`}
              departureTime={value.segments[0].departing_at}
              arrivalTime={value.segments[0].arriving_at}
              drawerData={value}
            ></FlightDetailCard>
          ))}
        </Row>
      )}
    </div>
  );
};

export default FlightDetail;
