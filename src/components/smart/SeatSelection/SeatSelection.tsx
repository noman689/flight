import React, { useEffect, useState } from 'react';
import { SeatSelection } from '@duffel/components';
import { useHistory, useParams } from 'react-router';
import {
  getSeatPlanAPI,
  getSelectedOfferDetailsAPI,
} from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
import './SeatSelection.scss';
import { useSelector } from 'react-redux';

const SeatSelectionComp = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [seatMap, setSeatMap] = useState(null);
  const [offerMeta, setOfferMeta] = useState(null);
  const [passengerData, setPassengerData] = useState([]);
  const [passengerInfo, setPassengerInfo] = useState([]);
  // const [selectedSlice, setSelectedSlice] = useState({});
  // @ts-ignore
  const parsedData = JSON.parse(localStorage.getItem('passengerData'));
  const history = useHistory();
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
        setPassengerData([...parsedData.seatPlanArray]);
        setPassengerInfo([...parsedData.passengerInfo]);
        // setSelectedSlice([parsedData.selectedSlice]);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    getSeatPlan();
  }, []);

  const onSubmitFn = (values) => {
    console.log('values', values);
    localStorage.setItem(
      'seatData',
      JSON.stringify({
        passengerDetails: values,
        offerDetails: offerMeta,
        passengerData: passengerInfo,
      }),
    );
    try {
      history.push(`/payment-method`);
    } catch (e) {
      console.log('error', e);
    }
  };
  console.log(offerMeta);
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
