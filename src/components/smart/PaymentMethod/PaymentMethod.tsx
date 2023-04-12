import React, { useEffect, useState } from 'react';
import { CardPayment } from '@duffel/components';
import { paymentIntentAPI } from '@client/services/paymentService';

const PaymentMethod = () => {
  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        const data = await paymentIntentAPI({
          total_amount: '12.00',
          total_currency: 'USD',
        });
        console.log('data', data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getPaymentIntent();
  }, []);
  const successfulPaymentHandlerFn = () => {
    // Show 'successful payment' page and confirm Duffel PaymentIntent
  };

  const errorPaymentHandlerFn = () => {
    // Show error page
  };
  return (
    <div>
      <CardPayment
        duffelPaymentIntentClientToken={
          'eyJjbGllbnRfc2VjcmV0IjoicGlfMUl5YTBiQW5rMVRkeXJvRE1iWkJPN0ZSX3NlY3JldF9TbGFrYnJjYnFHZGZha2VrcjdCNE5jZWVyIiwicHVibGlzaGFibGVfa2V5IjoicGtfbGl2ZV81MUl0Q3YwQW5rMUdkeXJvRFlFU3M3RnBTUEdrNG9kbDhneDF3Y1RBNVEzaUcyWEFWVEhxdFlKSVhWMUxoSU5GQUtFMjA1dFdmRGVIcXhwUVdnYkIzTkVFbzAwMmdVY1hzR0YifQ=='
        }
        successfulPaymentHandler={successfulPaymentHandlerFn}
        errorPaymentHandler={errorPaymentHandlerFn}
      />
    </div>
  );
};

export default PaymentMethod;
