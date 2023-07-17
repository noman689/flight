import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CardPayment } from '@duffel/components';
import {
  confirmPaymentAPI,
  paymentIntentAPI,
} from '@client/services/paymentService';
import Spin from '@client/components/presentational/Spin';
import { createOrderAPI } from '@client/services/createOrderService';
import { notification, Card, Modal, Button } from 'antd';
import { PDFDownloadLink } from '@react-pdf/renderer';
import FlightTicketPdf from '../FlightTicketPdf/FlightTicketPdf';
import { CheckOutlined } from '@ant-design/icons';

const PaymentMethod = ({ offerMeta, selectedSeatsData, passengersData }) => {
  const [clientToken, setClientToken] = useState('');
  const [clientId, setClientId] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [api, contextHolder] = notification.useNotification();
  const [totalSeatCosts, setTotalSeatsCost] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showConformModal, setConformModal] = useState(false);
  const [createdOrderDetails, setCreatedOrderDetails] = useState(null);
  const openNotification = (alertMessage) => {
    const placement = 'topRight';
    api.error({
      message: `${alertMessage}`,
      // description: `${alertDescription}`,
      placement,
    });
  };

  const getTotalSeatsCost = (data) => {
    let total_seats_amount = 0;
    for (let i = 0; i < data.length; i++) {
      total_seats_amount += Number(data[i].amount);
    }
    return total_seats_amount;
  };

  const calculateTotalAmount = (offerData) => {
    const totalChargedAmount =
      (totalSeatCosts + Number(offerData.total_amount)) / (1 - 0.029);
    return totalChargedAmount.toFixed(2).toString();
  };

  const getPaymentIntent = async () => {
    try {
      setLoading(true);
      const total_amount = calculateTotalAmount(offerMeta);
      const { data } = await paymentIntentAPI({
        total_amount: total_amount,
        total_currency: 'GBP',
      });
      setClientToken(data.offer.data.client_token);
      setClientId(data.offer.data.id);
      setLoading(false);
      setShowPaymentModal(true);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const getServicesArray = () => {
    let serviceArray = [];
    for (let i = 0; i < selectedSeatsData.length; i++) {
      serviceArray.push({
        quantity: 1,
        id: selectedSeatsData[i].serviceId,
      });
    }
    return serviceArray;
  };

  useEffect(() => {
    const result = getTotalSeatsCost(selectedSeatsData);
    setTotalSeatsCost(result);
  }, [selectedSeatsData]);

  const successfulPaymentHandlerFn = async () => {
    try {
      setIsPlacingOrder(true);
      const { data } = await confirmPaymentAPI(clientId);
      if (data.offer?.data) {
        const payload = {
          type: 'instant',
          selected_offers: [offerMeta.id],
          payments: [
            {
              type: 'balance',
              currency: 'GBP',
              amount: data.offer.data.net_amount,
            },
          ],
          services: [...getServicesArray()],
          passengers: [...passengersData.passengerInfo],
          metadata: {
            payment_intent_id: clientId,
          },
        };
        const { data: order } = await createOrderAPI(payload);
        setCreatedOrderDetails(order?.offer?.data);
        setIsPlacingOrder(false);
        setShowPaymentModal(false);
        setConformModal(true);
      }
    } catch (e) {
      setIsPlacingOrder(false);
      openNotification(e);
    }
  };

  const errorPaymentHandlerFn = () => {
    openNotification('Unable to process payment at this time');
    // Show error page
  };

  const handleConformCancel = () => {};

  return (
    <>
      {contextHolder}
      <Modal
        open={showConformModal}
        footer={null}
        maskClosable={false}
        onCancel={()=>history.push('/')}
        closable={true}
        afterClose={()=>history.push('/')}

      >
        <div className="conform-modal-content">
          <div className="success-message">
            Order Placed Successfully <CheckOutlined />
          </div>
          <div className="download-receipt-btn">
            <Button style={{ borderColor: '#701644' }}>
              <PDFDownloadLink
                document={<FlightTicketPdf data={createdOrderDetails} />}
                fileName="e-ticket.pdf"
                style={{ textDecoration: 'none', color: '#701644' }}
              >
                {({ loading }) =>
                  loading ? 'Loading Receipt...' : 'Download Receipt'
                }
              </PDFDownloadLink>
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={showPaymentModal}
        onCancel={() => setShowPaymentModal(false)}
        width={'600px'}
        footer={null}
      >
        <Card title="Payment Info" bordered={false}>
          {isPlacingOrder ? (
            'Placing order ....'
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
        </Card>
      </Modal>
      <div className="my-4 seatBox f-col w-100">
        <div className="single-item">
          <span>Total Price (.inc taxes)</span>
          <span>£{offerMeta.total_amount}</span>
        </div>
        {totalSeatCosts > 0 ? (
          <div className="single-item">
            <span>Seats Costs</span>
            <span>£{totalSeatCosts}</span>
          </div>
        ) : (
          <></>
        )}
        <div className="single-item">
          <span>Total Amount</span>
          <span>
          £{(Number(totalSeatCosts) + Number(offerMeta.total_amount)).toFixed(2)}
          </span>
        </div>
        <div onClick={getPaymentIntent} className="pay-btn">
          {loading ? <Spin /> : 'Pay'}
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
