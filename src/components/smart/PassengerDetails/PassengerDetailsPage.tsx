import React, { Fragment, useEffect, useState } from 'react';
import PassengerDetailsForm from './PassengerDetailsForm';
import FlightSummary from './FlightSummary';
import { getSelectedOfferDetailsAPI } from '@client/services/searchFlightService';
import { useParams } from 'react-router';
import './PassengerDetailsPage.scss';
import Spin from '@client/components/presentational/Spin';

const PassengerDetailsPage: React.FC = () => {
  const [selectedSlice, setSelectedSlice] = useState(null);
  const [passengerData, setPassengerData] = useState(0);
  const [fare, setFare] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  // @ts-ignore
  const { id, sliceId } = params;
  useEffect(() => {
    const selectedOfferDetails = async () => {
      try {
        setLoading(true);
        const { data } = await getSelectedOfferDetailsAPI(id);
        const selectedSliceItem = data?.offer?.data?.slices?.find(
          (item) => item.id == sliceId,
        );
        setFare(data?.offer?.data?.total_amount);
        setSelectedSlice(selectedSliceItem);
        setPassengerData(data?.offer?.data?.passengers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('error', error);
      }
    };
    selectedOfferDetails();
  }, []);
  return (
    <div className="passenger-details-page-layout">
      {loading ? (
        <Spin />
      ) : (
        <Fragment>
          <div className="form-section">
            <PassengerDetailsForm passengerData={passengerData} offerId={id} summaryData={selectedSlice} />
          </div>
          <div className="summary-section">
            <FlightSummary summaryData={selectedSlice} fare={fare} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PassengerDetailsPage;
