import { Row, Col, Divider, Button, Modal, Timeline } from 'antd';
import moment from 'moment';
// @ts-ignore
import planeImageBlack from '../../../assets/ticketBlack.svg';
import './FlightDetailCard.scss';
import { useHistory } from 'react-router-dom';
import { CloudFilled } from '@ant-design/icons';
import { useState } from 'react';
import { getAircraftDate, getDuration, getStops } from '@client/utils/helper';
import FlightInfoModal from '../FlightInfoModal/FlightInfoModal';

// const info = () => {
//   Modal.info({
//     centered: true,
//     title: 'Flight Details',
//     content: (
//       <div>
//         <h5> Friday, Mar 10</h5>
//         <div>
//           <Timeline
//             className="info-timeline"
//             mode={'left'}
//             items={[
//               {
//                 label: '03:14',
//                 color: 'green',
//                 children: (
//                   <>
//                     <p>city name</p>
//                     <span>city code</span>
//                   </>
//                 ),
//               },
//               {
//                 label: '4h',
//                 color: 'gray',
//                 children: (
//                   <>
//                     <p>plane Name</p>
//                     <span>Operated by Duffle Airways</span>
//                   </>
//                 ),
//               },
//               {
//                 label: '05:15',
//                 color: 'green',
//                 children: (
//                   <>
//                     <p>destination</p>
//                     <span>destination code</span>
//                   </>
//                 ),
//               },
//             ]}
//           />
//         </div>
//       </div>
//     ),
//     onOk() {},
//   });
// };

const FlightDetailCard = ({ data }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    // history.push(`/offer-details/${offerId}/${sliceId}`);
  };
  console.log('data', data);
  return (
    <>
      <Col xs={24} sm={24} md={23} lg={24} className="flightDetails">
        <Col xs={24} sm={24} md={24} lg={20}>
          {data?.slices.map((item) => {
            return (
              <div className="leftSection">
                <Col xs={24} sm={24} md={24} lg={2} className="flexColumn">
                  <img
                    src={data.owner?.logo_symbol_url}
                    style={{ height: 40, width: 40 }}
                  />
                  <div>
                    <p
                      className="dullWhite"
                      style={{ fontSize: 12, marginLeft: 20 }}
                    >
                      {data.owner?.name}
                    </p>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <div className="cardFirstPart">
                    <span>
                      {moment(getAircraftDate(item.segments, 'from')).format(
                        'hh:mm',
                      )}
                    </span>
                    <Divider>
                      <img
                        src={planeImageBlack}
                        style={{ height: 20, width: 20 }}
                      />
                    </Divider>
                    <span>
                      {moment(getAircraftDate(item.segments, 'to')).format(
                        'hh:mm',
                      )}
                    </span>
                  </div>
                  <div className="cardSecondPart dullWhite">
                    <span>{item.origin.iata_city_code}</span>
                    {/* <span>{departureSub}</span> */}
                    {/* ============DURATION============= */}
                    <span>
                      {getDuration(
                        getAircraftDate(item.segments, 'from'),
                        getAircraftDate(item.segments, 'to'),
                      )}
                    </span>
                    {/* ============DURATION============= */}
                    <span>{item.destination.iata_city_code}</span>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={2} className="placeCenter">
                  <div className="stops">
                    {getStops(item.segments).stopLength} Stop
                  </div>
                  {getStops(item.segments).stops.length ? (
                    getStops(item.segments).stops.map((stop, index) => {
                      return <span>{stop[index]}</span>;
                    })
                  ) : (
                    <></>
                  )}
                </Col>
              </div>
            );
          })}

          <Col xs={24} sm={24} md={24} lg={4} className="lowerLeftSection">
            <Button
              className="mybutton"
              type="text"
              onClick={() => setShowModal(true)}
            >
              Flight Details
            </Button>
          </Col>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} className="rightSection">
          <div className="alignitems">
            <h6>Fare: ${data.total_amount}</h6>
            <p className="alignContent">
              <CloudFilled size={7} />
              {data.total_emissions_kg}g
              <span>
                &nbsp;CO
                <sub>2</sub>
              </span>
            </p>
          </div>
          <Button className="bookButton" onClick={(e) => handleClick(e)}>
            Book Now
          </Button>
        </Col>
      </Col>
      <FlightInfoModal show={showModal} setShow={setShowModal} data={data} />
    </>
  );
};

export default FlightDetailCard;
