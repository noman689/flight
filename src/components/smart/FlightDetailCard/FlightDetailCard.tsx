import { Row, Col, Divider } from 'antd';
import moment from 'moment';

import './FlightDetailCard.scss';
import { useHistory } from 'react-router-dom';

const FlightDetailCard = ({
  fromDate,
  toDate,
  departureSub,
  destinationSub,
  fareAmount,
  offerId,
  sliceId,
}) => {
  const history = useHistory();

  const handleClick = (e) => {
    e.stopPropagation();
    history.push(`/offer-details/${offerId}/${sliceId}`);
  };
  return (
    <div className="flight-detail-card-item">
      <div className="flightDetails">
        <Col xs={24} sm={24} md={23} lg={23} style={{ padding: '20px' }}>
          <Row justify={'space-between'}>
            <Col xs={24} sm={24} md={24} lg={10}>
              <div className="flight-date">
                {moment(fromDate).format('MMM Do YY')}
              </div>
              <div className="cardFirstPart">
                <span>{moment(fromDate).format('hh:m')}</span>
                <Divider>
                  <img src="https://www.qatarairways.com/content/dam/images/icons/flight/ic_nav_qatar_airways.svg" />
                </Divider>
                <span>{moment(toDate).format('hh:m')}</span>
              </div>
              <div className="cardSecondPart dullWhite">
                <span>{departureSub}</span>
                <span>{destinationSub}</span>
              </div>

              <div className="lower-div mt-none mt-50">
                <span className="hideAbove768">Fare ${fareAmount}</span>
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
                <div>
                  <span className="cardhead">Fare</span>
                  <br />
                  <span style={{ fontSize: '30px' }}>${fareAmount}</span>
                </div>
              </div>
            </Col>
            <div className="book-now">
              <span onClick={(e) => handleClick(e)}>Book Now</span>
            </div>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default FlightDetailCard;
