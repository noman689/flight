import React, { Fragment, useEffect, useState } from 'react';
import PassengerDetailsForm from './PassengerDetailsForm';
import FlightSummary from './FlightSummary';
import { getSelectedOfferDetailsAPI } from '@client/services/searchFlightService';
import { useParams } from 'react-router';
import './PassengerDetailsPage.scss';
import Spin from '@client/components/presentational/Spin';
import { isEmpty } from 'ramda';

const PassengerDetailsPage: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [passengerData, setPassengerData] = useState(0);
  const [fare, setFare] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  // @ts-ignore
  const { id } = params;
  useEffect(() => {
    const selectedOfferDetails = async () => {
      try {
        setLoading(true);
        const { data } = await getSelectedOfferDetailsAPI(id);
        // const selectedSliceItem = !isEmpty(data.slices) && data?.offer?.data?.slices?.find(
        //   (item) => item.id == sliceId,
        // );
        setFare(data?.offer?.data?.total_amount);
        setSelectedOffer(data?.offer);
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
            <PassengerDetailsForm
              passengerData={passengerData}
              offerId={id}
              summaryData={selectedOffer}
            />
          </div>
          <div className="summary-section">
            <FlightSummary summaryData={selectedOffer} fare={fare} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PassengerDetailsPage;
