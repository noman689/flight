import React, { useEffect, useState } from 'react';
import { SeatSelection } from '@duffel/components';
import { Modal } from 'antd';
import { useParams, useHistory } from 'react-router';
import {
  getSeatPlanAPI,
  getSelectedOfferDetailsAPI,
} from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
import { paymentIntentAPI } from '@client/services/paymentService';
import { isEmpty } from 'ramda';

const SeatSelectionComp = () => {
  const params = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [seatMap, setSeatMap] = useState(null);
  const [offerMeta, setOfferMeta] = useState(null);
  const [passengerData, setPassengerData] = useState([]);
  const [payloadObject, setPayloadObject] = useState({});

  // @ts-ignore
  const { id } = params;
  useEffect(() => {
    const getSeatPlan = async () => {
      try {
        setLoading(true);
        const { data } = await getSeatPlanAPI(id);
        const { data: sliceData } = await getSelectedOfferDetailsAPI(id);
        setSeatMap(data?.offer);
        setOfferMeta(sliceData?.offer?.data);
        const encodedData = window.location.href.split('=')[1];
        setPassengerData([...JSON.parse(decodeURIComponent(encodedData))]);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    getSeatPlan();
  }, []);

  function calculateTotal(obj) {
    let totalAmount = 0;
    let currency = '';
    for (const key1 in obj) {
      for (const key2 in obj[key1]) {
        totalAmount += parseFloat(obj[key1][key2].service.total_amount);
        currency = obj[key1][key2].service.total_currency;
      }
    }

    return {
      total_currency: currency,
      total_amount: totalAmount.toFixed(2),
    };
  }

  const onSubmitFn = (e) => {
    alert(JSON.stringify(e));
    setPayloadObject(paymentIntentAPI(calculateTotal(e)));
    console.log(e);
  };

  useEffect(() => {
    if (!isEmpty(payloadObject)) {
      // history.push(`/seat-selection/${payloadObject.data.id}`);
      // history.push(`/seat-selection/${}`);

      history.push({
        pathname: '/ticket-payment',
        search: '?id=pit_00009hthhsUZ8W4LxQgkjo',
      });
    }
  }, [payloadObject]);

  console.log(payloadObject, 'payloadObject');
  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <div className='mb-4 mt-4'>
          <SeatSelection
            offer={offerMeta}
            seatMaps={[{ ...seatMap }]}
            passengers={passengerData}
            onSubmit={onSubmitFn}
          />
        </div>
      )}
    </div>
  );
};

export default SeatSelectionComp;
