import React, { useEffect, useState } from 'react';
import { Row, Col, Divider } from 'antd';
import moment from 'moment';

import './FlightDetailCard.scss';
import FlightInfoDrawer from '../FlightInfoDrawer/FlightInfoDrawer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectedOffer } from '@client/store/app/action';
import { useNavigate } from 'react-router-dom';

const FlightDetailCard = ({
  fromDate = '02-02-2021',
  toDate = '03-02-2021',
  departure = 'Karachi',
  departureSub = 'KTC',
  destination = 'Lahore',
  destinationSub = 'Lhr',
  plan = '1 passenger',
  type = 'Return',
  departureImg = 'https://source.unsplash.com/1600x900/?lahore',
  departureTime,
  arrivalTime,
  drawerData,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  console.log(
    'testingValues',
    fromDate,
    toDate,
    departure,
    departureSub,
    destination,
    destinationSub,
    plan,
    type,
    departureImg,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    // @ts-ignore
    dispatch(selectedOffer(drawerData));
    navigate('/passanger-details');
  };
  return (
    <div className="flight-detail-card-item">
      <Row className="flightDetails" justify="space-between">
        <Col xs={24} sm={24} md={23} lg={23} style={{ padding: '20px' }}>
          <Row justify={'space-between'}>
            <Col xs={24} sm={24} md={24} lg={10}>
              <div className="cardFirstPart">
                <span>{moment(departureTime).format('hh:m')}</span>
                <Divider>
                  <img src="https://www.qatarairways.com/content/dam/images/icons/flight/ic_nav_qatar_airways.svg" />
                </Divider>
                <span>{moment(arrivalTime).format('hh:m')}</span>
              </div>

              <div className="cardSecondPart dullWhite">
                <span>{departureSub}</span>
                {/* <span>2 Stops, 19h 20m</span> */}
                <span>{destinationSub}</span>
              </div>

              <div className="lower-div mt-none mt-50">
                <span
                  className="flightDetails2 font-size"
                  onClick={() => setShowDrawer(true)}
                >
                  Flight Details
                </span>
                <Link to="/passanger-details">
                  <span className="hideAbove768">XOF 1,137,300</span>
                </Link>
              </div>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              className="thirdPart hide-card-part"
            >
              <div className="card">
                <div onClick={handleClick}>
                  <span className="cardhead">Economy</span>
                  <br />
                  <span style={{ fontSize: '30px' }}>XOF 1,137,300</span>
                </div>
              </div>

              <div className="card">
                <div onClick={handleClick}>
                  <span className="cardhead">Business</span>
                  <br />
                  <span style={{ fontSize: '30px' }}>XOF 2,087,300</span>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <FlightInfoDrawer
        open={showDrawer}
        drawerData={drawerData}
        setOpen={setShowDrawer}
        key="FlightInfoDrawer"
      />
    </div>
  );
};

export default FlightDetailCard;
