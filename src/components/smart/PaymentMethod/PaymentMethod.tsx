import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { CardPayment } from '@duffel/components';
import {
  confirmPaymentAPI,
  paymentIntentAPI,
} from '@client/services/paymentService';
import Spin from '@client/components/presentational/Spin';
import { createOrderAPI } from '@client/services/createOrderService';
import { getFriendlyErrorMessage } from './ErrorHandling'
import { notification, Space } from 'antd';

const PaymentMethod = () => {
  const [clientToken, setClientToken] = useState('');
  const [clientId, setClientId] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSlice, setSelectedSlice] = useState({})
  const history = useHistory();
  const [api, contextHolder] = notification.useNotification();


  const openNotification = (alertMessage) => {
    const placement = 'topRight'
    api.error({
      message: `${alertMessage}`,
      // description: `${alertDescription}`,
      placement,
    });
  };

  const calculateTotalAmount = (offerData, passengerData) => {
    const parentObjKeys = Object.keys(passengerData);
    const nestedKeys = Object.keys(passengerData[parentObjKeys[0]]);
    let seatCosts = 0;
    for (
      let i = 0;
      i < Object.keys(passengerData[parentObjKeys?.[0]])?.length;
      i++
    ) {
      seatCosts += Number(
        passengerData[parentObjKeys[0]][nestedKeys[i]]?.service?.total_amount,
      );
    }
    const totalChargedAmount =
      (seatCosts + Number(offerData.total_amount)) / (1 - 0.029);

    return totalChargedAmount.toFixed(2).toString();
  };

  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        setLoading(true);
        const encodedData = window.location.href.split('=')[1];
        const meta = JSON.parse(decodeURIComponent(encodedData));
        console.log("user information", meta)
        setSelectedSlice(meta.selectedSlice)
        const total_amount = calculateTotalAmount(
          meta.offerDetails,
          meta.passengerDetails,
        );

        const { data } = await paymentIntentAPI({
          total_amount: total_amount,
          total_currency: 'USD',
        });
        setClientToken(data.offer.data.client_token);
        setClientId(data.offer.data.id);
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    getPaymentIntent();
  }, []);
  const successfulPaymentHandlerFn = async () => {
    try {
      const { data } = await confirmPaymentAPI(clientId);
      console.log("testing", data)
      if (data.offer?.data) {
        const encodedData = window.location.href.split('=')[1];
        const meta = JSON.parse(decodeURIComponent(encodedData));
        const total_amount = calculateTotalAmount(
          meta.offerDetails,
          meta.passengerDetails,
        );
        const payload = {
          type: 'instant',
          selected_offers: [meta.offerDetails.id],
          payments: [
            {
              type: 'balance',
              currency: 'USD',
              amount: meta.offerDetails.total_amount,
            },
          ],
          passengers: [...meta.passengerData],
          metadata: {
            payment_intent_id: clientId,
          },
        };
        const create = await createOrderAPI(payload);
        console.log("create", create)
        history.push(
          `/flight-ticket?data=${encodeURIComponent(
            JSON.stringify({
              confirmationDetails: create,
              selectedSlice: selectedSlice
            }),
          )}`,
        );
      }
    } catch (e) {
      openNotification(getFriendlyErrorMessage(e))
      console.log(getFriendlyErrorMessage(e))
      console.log('e', e);
    }
  };

  const errorPaymentHandlerFn = () => {
    // Show error page
  };
  return (

    <div>
      {contextHolder}
      {loading ? (
        <Spin />
      ) : (
        <CardPayment
          duffelPaymentIntentClientToken={
            clientToken ||
            'eyJjbGllbnRfc2VjcmV0IjoicGlfMUl5YTBiQW5rMVRkeXJvRE1iWkJPN0ZSX3NlY3JldF9TbGFrYnJjYnFHZGZha2VrcjdCNE5jZWVyIiwicHVibGlzaGFibGVfa2V5IjoicGtfbGl2ZV81MUl0Q3YwQW5rMUdkeXJvRFlFU3M3RnBTUEdrNG9kbDhneDF3Y1RBNVEzaUcyWEFWVEhxdFlKSVhWMUxoSU5GQUtFMjA1dFdmRGVIcXhwUVdnYkIzTkVFbzAwMmdVY1hzR0YifQ=='
          }
          successfulPaymentHandler={successfulPaymentHandlerFn}
          errorPaymentHandler={errorPaymentHandlerFn}
        />
      )}
    </div>
  );
};

export default PaymentMethod;
