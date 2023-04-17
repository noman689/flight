import Spin from '@client/components/presentational/Spin';
import { getFlightOffersAPI } from '@client/services/searchFlightService';
import { Row } from 'antd';
import { isEmpty } from 'ramda';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FlightDetailCard from '../FlightDetailCard/FlightDetailCard';
import './FlightDetail.scss';

const FlightDetail = () => {
  const [offersArray, setOffersArray] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  // @ts-ignore
  const { id } = params;

  useEffect(() => {
    const getOfers = async () => {
      try {
        setLoading(true);
        const { data } = await getFlightOffersAPI(id);
        setOffersArray(data.offer?.data);

        setLoading(false);
      } catch (e) {
        console.log('error', e);
        setLoading(false);
      }
    };
    getOfers();
  }, [id]);

  console.log('offersArray', offersArray);

  return (
    <div className="main_page_width m-b-30 date-tabs">
      {loading ? (
        <Row justify="center">
          <Spin />
        </Row>
      ) : (
        <>
          {offersArray?.length &&
            offersArray?.map((offer) => {
              return offer?.slices?.map((item) => {
                return (
                  <FlightDetailCard
                    fromDate={item.segments[0].departing_at}
                    toDate={item.segments[0].arriving_at}
                    departureSub={item.segments[0].origin.iata_city_code}
                    destinationSub={item.segments[0].destination.iata_city_code}
                    sliceId={item.id}
                    fareAmount={offersArray.total_amount}
                    offerId={offersArray.id}
                  ></FlightDetailCard>
                );
              });
            })}
        </>
      )}
    </div>
  );
};

export default FlightDetail;
