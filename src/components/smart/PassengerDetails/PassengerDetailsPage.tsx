import React, { Fragment, useEffect, useState } from 'react';
import PassengerDetailsForm from './PassengerDetailsForm';
import FlightSummary from './FlightSummary';
import { getSelectedOfferDetailsAPI } from '@client/services/searchFlightService';
import { useParams } from 'react-router';
import Spin from '@client/components/presentational/Spin';
import SeatSelectionComp from '../SeatSelection/SeatSelection';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import './PassengerDetailsPage.scss';

const PassengerDetailsPage: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [passengerData, setPassengerData] = useState(0);
  const [fare, setFare] = useState('');
  const [loading, setLoading] = useState(false);
  const [seatComponentData, setSeatComponentData] = useState({});
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [selectedOfferAndSeatsData, setSelectedSeatsData] = useState([]);
  const params = useParams();
  // @ts-ignore
  const { id } = params;
  useEffect(() => {
    const selectedOfferDetails = async () => {
      try {
        setLoading(true);
        const { data } = await getSelectedOfferDetailsAPI(id);
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
    <div className="passenger-details-page-layout main_page_width">
      {loading ? (
        <Spin />
      ) : selectedOffer ? (
        <div className="passengers-content-section">
          <div className="passenger-info-section  ">
            <div className="form-section">
              <PassengerDetailsForm
                passengerData={passengerData}
                setSeatComponentData={setSeatComponentData}
                setIsFormValidated={setIsFormValidated}
              />
            </div>
            <div className="summary-section">
              <FlightSummary summaryData={selectedOffer} fare={fare} />
            </div>
          </div>
          {!isFormValidated ? (
            <>
              <div>
                <SeatSelectionComp
                  seatComponentData={seatComponentData}
                  offerMeta={selectedOffer}
                  setSelectedSeatsData={setSelectedSeatsData}
                />
              </div>
              <div>
                <PaymentMethod
                  offerMeta={selectedOffer?.data}
                  selectedSeatsData={selectedOfferAndSeatsData}
                  passengersData={seatComponentData}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <>Offer not Available</>
      )}
    </div>
  );
};

export default PassengerDetailsPage;
