import React, { useEffect, useState } from 'react';
import { SeatSelection } from '@duffel/components';
import { Modal } from 'antd';
import { useParams } from 'react-router';
import {
  getSeatPlanAPI,
  getSelectedOfferDetailsAPI,
} from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
import { paymentIntentAPI } from '@client/services/paymentService';

const SeatSelectionComp = () => {
  const params = useParams();
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

    const newData = {
      data: {
        total_currency: currency,
        total_amount: totalAmount.toFixed(2),
      },
    };

    return newData;
  }

  const onSubmitFn = (e) => {
    alert(JSON.stringify(e));
    setPayloadObject(paymentIntentAPI(calculateTotal(e)));
    console.log(e);
  };

  console.log(payloadObject, 'payloadObject');
  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <SeatSelection
          offer={offerMeta}
          seatMaps={[{ ...seatMap }]}
          passengers={passengerData}
          onSubmit={onSubmitFn}
        />
      )}
    </div>
  );
};

export default SeatSelectionComp;
