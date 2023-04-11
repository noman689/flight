import React, { useEffect, useState } from 'react';
import { CardPayment } from '@duffel/components';
import '@duffel/components/dist/CardPayment.min.css';

const PaymentMethod = () => {
    const successfulPaymentHandlerFn = () => {
      // Show 'successful payment' page and confirm Duffel PaymentIntent
    };

    const errorPaymentHandlerFn = () => {
      // Show error page
    };
  return (
    <div>
      <CardPayment
        duffelPaymentIntentClientToken={'c2hramgzaGVsbG8gd29ybGQgIyMgZ2lyYWY='}
        // successfulPaymentHandler={successfulPaymentHandlerFn}
        // errorPaymentHandler={errorPaymentHandlerFn}
      />
    </div>
  );
};

export default PaymentMethod;
