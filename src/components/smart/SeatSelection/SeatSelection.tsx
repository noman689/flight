import React, { useEffect, useState } from 'react';
import { SeatSelection } from '@duffel/components';
import { Modal } from 'antd';
import { useParams } from 'react-router';
import {
  getSeatPlanAPI,
  getSelectedOfferDetailsAPI,
} from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
import './SeatSelection.scss';

const SeatSelectionComp = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [seatMap, setSeatMap] = useState(null);
  const [offerMeta, setOfferMeta] = useState(null);
  const [passengerData, setPassengerData] = useState([]);

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

  const onSubmitFn = (e) => {
    alert(JSON.stringify(e));
    console.log(e);
  };

  return (
    <div className="seat-component">
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
