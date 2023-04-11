import React, { useState, useEffect } from 'react';
import { CardPayment } from '@duffel/components';
// import '@duffel/components/dist/CardPayment.min.css';
import { useLocation } from 'react-router';
const TicketPayment = () => {
  const [idToken, setIdToken] = useState('');
  const location = useLocation();

  const successfulPaymentHandlerFn = () => {
    // Show 'successful payment' page and confirm Duffel PaymentIntent
  };

  const errorPaymentHandlerFn = () => {
    // Show error page
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location?.search);

    setIdToken(urlSearchParams.get('id'));
  }, [location?.search]);

  return (
    <div>
      {/* <CardPayment
        duffelPaymentIntentClientToken={idToken}
        successfulPaymentHandler={successfulPaymentHandlerFn}
        errorPaymentHandler={errorPaymentHandlerFn}
      /> */}
    </div>
  );
};

export default TicketPayment;
