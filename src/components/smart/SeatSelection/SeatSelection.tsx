import { useEffect, useState } from 'react';
import { SeatSelection } from '@duffel/components';
import { useParams } from 'react-router';
import { getSeatPlanAPI } from '@client/services/searchFlightService';
import Spin from '@client/components/presentational/Spin';
import './SeatSelection.scss';
import { Modal } from 'antd';

const SeatSelectionComp = ({
  seatComponentData,
  setSelectedSeatsData,
  offerMeta,
}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [seatMap, setSeatMap] = useState(null);
  const [passengerData, setPassengerData] = useState([]);
  const [selectedSeatsInfo, setSelectedSeatsInfo] = useState([]);
  const [open, setOpen] = useState(false);
  // @ts-ignore
  // @ts-ignore
  const { id } = params;
  useEffect(() => {
    const getSeatPlan = async () => {
      try {
        setLoading(true);
        const { data } = await getSeatPlanAPI(id);
        setSeatMap(data?.offer);
        setPassengerData([...seatComponentData.seatPlanArray]);
        setLoading(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'auto',
        });
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    getSeatPlan();
  }, []);

  const onSubmitFn = (values) => {
    setOpen(false);
    try {
      let tempArray = [];
      const segmentKeys = Object.keys(values);
      for (let i = 0; i < segmentKeys.length; i++) {
        const passengerKeys = Object.keys(values[segmentKeys[i]]);
        for (let j = 0; j < passengerKeys.length; j++) {
          tempArray.push({
            seatNumber: values[segmentKeys[i]][passengerKeys[j]]['designator'],
            serviceId: values[segmentKeys[i]][passengerKeys[j]]?.service?.id,
            passengerId:
              values[segmentKeys[i]][passengerKeys[j]]?.service?.passenger_id,
            amount:
              values[segmentKeys[i]][passengerKeys[j]]?.service?.total_amount,
            flightIndex: i,
          });
        }
      }
      setSelectedSeatsInfo(tempArray);
      setSelectedSeatsData(tempArray);
    } catch (e) {
      console.log('error', e);
    }
  };

  const getSelectedSeatInfo = (data, key) => {
    const filteredItems = data?.filter((item) => item.flightIndex == key);
    let totalAmount = 0;
    for (let i = 0; i < filteredItems.length; i++) {
      totalAmount += Number(filteredItems[i].amount);
    }
    return {
      count: filteredItems.length,
      totalAmount,
    };
  };

  return (
    <>
      <Modal
        open={open}
        footer={null}
        closable={false}
        width={'95%'}
        onCancel={() => setOpen(false)}
      >
        <SeatSelection
          offer={offerMeta?.data}
          seatMaps={seatMap}
          passengers={passengerData}
          onSubmit={onSubmitFn}
        />
      </Modal>
      <div className="seat-component">
        {loading ? (
          <Spin />
        ) : (
          <div className="seatBox-wrapper">
            {offerMeta?.data?.slices?.length &&
              offerMeta?.data.slices.map((item, index) => {
                return (
                  <div className="seatBox">
                    <div>
                      <span className="about-flight">
                        <img
                          src={offerMeta?.data.owner.logo_symbol_url}
                          width={30}
                        />
                        {item.segments[0].origin.iata_city_code} to{' '}
                        {
                          item.segments[item.segments.length - 1].destination
                            .iata_city_code
                        }
                      </span>
                      <span className="selected-seats-info">
                        {`${
                          getSelectedSeatInfo(selectedSeatsInfo, index).count
                        } seats selected for $${
                          getSelectedSeatInfo(selectedSeatsInfo, index)
                            .totalAmount
                        }`}
                      </span>
                    </div>
                    <div className="btn-wrapper">
                      <div className="seat-numbers">
                        {selectedSeatsInfo.length &&
                          selectedSeatsInfo.map((item) => {
                            if (item.flightIndex == index) {
                              return <span>{item?.seatNumber}</span>;
                            }
                          })}
                      </div>
                      <span
                        className="select-btn"
                        onClick={() => setOpen(true)}
                      >
                        Select Seats
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default SeatSelectionComp;
